import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
/* Store */
import store from "./app/store";

// Import our custom CSS
import "./scss/styles.scss";

import HomeView from "./view/HomeView.jsx";
import ErrorView from "./view/ErrorView";
import SupplierView from "./view/SupplierView";

const router = createBrowserRouter([
  { path: "/", element: <HomeView />, errorElement: <ErrorView /> },
  {
    path: "/supplier",
    element: <SupplierView />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
