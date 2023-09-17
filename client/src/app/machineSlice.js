import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, MACHINE_ID } from "../data/constants";
import axios from "axios";

const initialMachine = {
  machineMoney: 0,
  products: [
    {
      id: 1,
      name: "Water",
      img: "/images/water.jpg",
      price: 0,
      quantity: 0,
    },
    {
      id: 2,
      name: "Coke",
      img: "/images/coke.jpg",
      price: 0,
      quantity: 0,
    },
    {
      id: 3,
      name: "Soda",
      img: "/images/soda.jpg",
      price: 0,
      quantity: 0,
    },
  ],
};

// status : 'idle', 'loading', 'completed'
const initialState = {
  machine: initialMachine,
  status: "idle",
  error: null,
};

/* Service - Get Machine Info */
export const fetchMachineData = createAsyncThunk(
  "machine/getMachine",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/machines/${MACHINE_ID}`);

    return response.data;
  }
);

/* Service - Update Machine Money, Update Machine Product */
export const buyProduct = createAsyncThunk(
  "machine/buyProduct",
  async (productId, { dispatch, getState }) => {
    const state = getState().machine;

    const product = state.machine.products.find((e) => e.id === productId);
    const newMoney = state.machine.machineMoney + product.price;

    const newProduct = { productId: productId, newStock: product.quantity - 1 };
    dispatch(updateProductStock(newProduct));
    dispatch(optimisticBuyProduct(productId));

    const response = await axios.put(`${API_BASE_URL}/machines/${MACHINE_ID}`, {
      newMoney: newMoney,
    });

    return response.data;
  }
);

/* Service - Update Machine Product */
export const updateProductStock = createAsyncThunk(
  "machine/updateProductStock",
  async (data, thunkAPI) => {
    const { productId, newStock } = data;

    thunkAPI.dispatch(optimisticUpdateStock(data));

    const response = await axios.post(`${API_BASE_URL}/machine-products`, {
      machineId: MACHINE_ID,
      productId: productId,
      quantity: newStock,
    });

    return response.data;
  }
);

/* Service - Update Machine Money */
export const collectMachineMoney = createAsyncThunk(
  "machine/collectMachineMoney",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(optimisticResetMoney());

    const response = await axios.put(`${API_BASE_URL}/machines/${MACHINE_ID}`, {
      newMoney: 0,
    });

    return response.data;
  }
);

/* Service - Update Product Price */
export const updateProductPrice = createAsyncThunk(
  "machine/updateProductPrice",
  async (data, thunkAPI) => {
    const { productId, newPrice } = data;

    thunkAPI.dispatch(optimisticUpdateProduct(data));

    const response = await axios.put(`${API_BASE_URL}/products/${productId}`, {
      newPrice: newPrice,
    });

    return response.data;
  }
);

const machineSlice = createSlice({
  name: "machine",
  initialState,
  reducers: {
    optimisticBuyProduct(state, action) {
      const id = action.payload;

      let product = state.machine.products.find((e) => e.id === id);

      state.machine.machineMoney += product.price;
    },

    optimisticUpdateStock(state, action) {
      const { productId, newStock } = action.payload;

      let product = state.machine.products.find((e) => e.id === productId);

      product.quantity = newStock;
    },

    optimisticResetMoney(state, action) {
      state.machine.machineMoney = 0;
    },

    optimisticUpdateProduct(state, action) {
      const { productId, newPrice } = action.payload;

      let product = state.machine.products.find((e) => e.id === productId);

      product.price = newPrice;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMachineData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMachineData.fulfilled, (state, action) => {
        state.status = "completed";

        const data = action.payload;
        state.machine.machineMoney = data.money;

        data.products.forEach((element) => {
          const product = state.machine.products.find(
            (e) => e.id === element.productId
          );

          product.price = element.productPrice;
          product.quantity = element.quantity;
        });
      })
      .addCase(fetchMachineData.rejected, (state) => {
        state.status = "completed";
        state.error = "An error occured, please try again.";
      })

      /* Buy Product */
      .addCase(buyProduct.rejected, (state) => {
        state.error = "An error occured while buying the product.";
      })

      /* Buy Product or Update the stocks */
      .addCase(updateProductStock.rejected, (state) => {
        state.error = "An error occured while updating the stocks.";
      })

      .addCase(collectMachineMoney.rejected, (state) => {
        state.error = "An error occured while collecting the money.";
      })

      .addCase(updateProductPrice.rejected, (state) => {
        state.error = "An error occured while updating the product price.";
      });
  },
});

export const {
  loadMoney,
  refundMoney,
  optimisticUpdateProduct,
  optimisticResetMoney,
  optimisticBuyProduct,
  optimisticUpdateStock,
} = machineSlice.actions;

export default machineSlice.reducer;
