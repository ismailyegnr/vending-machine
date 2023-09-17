import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { buyProduct, fetchMachineData } from "../app/machineSlice";

import Button from "react-bootstrap/Button";
import ProductCard from "../components/ProductCard";
import ProgressLoading from "../components/ProgressLoading";
import CustomToast from "../components/CustomToast";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "../utils/auth";

function HomeView() {
  const { machine, status, error } = useSelector((state) => state.machine);
  const dispatch = useDispatch();
  const auth = useAuth();

  const [userMoney, setUserMoney] = useLocalStorage("userMoney", 0);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMachineData());
    }
    auth.logout();
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

  /* Products */
  const onProductClicked = (product) => {
    if (product.quantity === 0) {
      setNewToast(
        "warning",
        "Unsuccessful",
        `There is no ${product.name} right now.`
      );
      return;
    }
    if (userMoney < product.price) {
      setNewToast(
        "danger",
        "Unsuccessful",
        `You don't have enough money to buy a ${product.name}.`
      );
      return;
    }

    setNewToast(
      "success",
      "Success",
      `You can get your ${product.name} and ${
        userMoney - product.price
      }₺ change.`
    );

    setUserMoney(0);
    dispatch(buyProduct(product.id));
  };

  const onCancel = () => {
    if (userMoney > 0) {
      setNewToast(
        "success",
        "Success",
        `You can get your ${userMoney}₺ refund.`
      );

      setUserMoney(0);
    }
  };

  const renderedProducts = machine.products.map((product) => (
    <ProductCard
      key={product.id}
      name={product.name}
      image={product.img}
      price={product.price}
      count={product.quantity}
      clickEvent={() => onProductClicked(product)}
    />
  ));

  if (status === "loading") {
    return ProgressLoading();
  }
  return (
    <div className="position-relative">
      <h1 className="text-center mb-4">Vending Machine</h1>

      <CustomToast toasts={toasts} setToasts={setToasts} />

      <div className="container text-center">
        <div className="row" style={{ height: "75vh" }}>
          <div className="col-8 d-flex flex-column">
            <h2 className="mb-5">Products</h2>

            <div className="d-flex flex-wrap gap-5 justify-content-center">
              {renderedProducts}
            </div>

            <Link to={`supplier`} className="mt-auto">
              <Button variant="warning" size="lg" className="w-50 mx-auto">
                Supplier
              </Button>
            </Link>
          </div>

          <div className="col-4 border-start d-flex flex-column">
            <h2 className="mb-5">Current Money: {userMoney}</h2>

            {/* Load Buttons */}
            <div className="d-grid gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setUserMoney(userMoney + 1)}
              >
                Load 1₺
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setUserMoney(userMoney + 5)}
              >
                Load 5₺
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setUserMoney(userMoney + 10)}
              >
                Load 10₺
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setUserMoney(userMoney + 20)}
              >
                Load 20₺
              </Button>
            </div>

            <Button
              variant="danger"
              size="lg"
              className="mt-auto"
              onClick={onCancel}
            >
              Cancel Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeView;
