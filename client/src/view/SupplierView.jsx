import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  collectMachineMoney,
  fetchMachineData,
  updateProductStock,
  updateProductPrice,
} from "../app/machineSlice";

import Button from "react-bootstrap/Button";
import ProductCard from "../components/ProductCard";
import ProgressLoading from "../components/ProgressLoading";
import CustomToast from "../components/CustomToast";

export default function SupplierView() {
  const { machine, status, error } = useSelector((state) => state.machine);
  const dispatch = useDispatch();

  const [changeAmount, setChangeAmount] = useState(
    Array(machine.products.length).fill("1")
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMachineData());
    }
  }, []);

  useEffect(() => {
    if (error) {
      setNewToast("danger", "Error", error);
    }
  }, [error]);

  /* Toasts */
  const [toasts, setToasts] = useState([]);

  function setNewToast(type, title, message) {
    const newArray = [...toasts];

    const newToast = {
      type: type,
      show: true,
      title: title,
      message: message,
    };

    newArray.push(newToast);
    setToasts(newArray);
  }

  function handleChangeAmount(val, index) {
    const nextChangeAmounts = changeAmount.map((c, i) => {
      if (i === index) {
        return val;
      } else {
        return c;
      }
    });

    setChangeAmount(nextChangeAmounts);
  }

  function setNewPrice(product, change) {
    const changeValue = Number(change) || 0;

    if (!(product.price === 0 && changeValue <= 0)) {
      let newValue = Math.max(product.price + changeValue, 0);

      dispatch(
        updateProductPrice({
          productId: product.id,
          newPrice: newValue,
        })
      );
    }
  }

  if (status === "loading") {
    return ProgressLoading();
  }
  return (
    <div className="position-relative">
      <h1 className="text-center mb-4">Vending Machine - Supplier Portal</h1>

      <CustomToast toasts={toasts} setToasts={setToasts} />

      <div className="container text-center">
        <div className="row" style={{ height: "75vh" }}>
          <div className="col-8 d-flex flex-column">
            <h2 className="mb-5">Products</h2>
            <div className="d-flex flex-wrap gap-5 justify-content-center">
              {/* Product List with buttons */}
              {machine.products.map((product, index) => (
                <div className="d-flex flex-column" key={product.id}>
                  <ProductCard
                    name={product.name}
                    image={product.img}
                    price={product.price}
                    count={product.quantity}
                  />
                  <label htmlFor={`price${product.id}`} className="mt-3">
                    Change Price by
                  </label>
                  <input
                    key={`price${product.id}`}
                    id={`price${product.id}`}
                    name={`price${product.id}`}
                    type="number"
                    className="mb-2"
                    value={changeAmount[index]}
                    onChange={(e) => handleChangeAmount(e.target.value, index)}
                  />

                  <div className="d-flex gap-2 mb-4">
                    <Button
                      variant="primary"
                      className="flex-grow-1"
                      onClick={() =>
                        setNewPrice(product, `+${changeAmount[index]}`)
                      }
                    >
                      Raise
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-grow-1"
                      onClick={() =>
                        setNewPrice(product, `-${changeAmount[index]}`)
                      }
                    >
                      Discount
                    </Button>
                  </div>

                  <Button
                    variant="success"
                    className="mb-2"
                    onClick={() =>
                      dispatch(
                        updateProductStock({
                          productId: product.id,
                          newStock: product.quantity + 1,
                        })
                      )
                    }
                  >
                    Add Stock
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() =>
                      dispatch(
                        updateProductStock({
                          productId: product.id,
                          newStock: 0,
                        })
                      )
                    }
                  >
                    Reset Stocks
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-4 border-start d-flex flex-column">
            <h2 className="mb-5">Total Money: {machine.machineMoney}</h2>
            <Button
              variant="primary"
              size="lg"
              onClick={() => dispatch(collectMachineMoney())}
            >
              Collect Money
            </Button>

            <Link to=".." relative="path" className="mt-auto">
              <Button variant="warning" size="lg" className="w-100">
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
