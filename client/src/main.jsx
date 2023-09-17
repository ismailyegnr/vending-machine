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
import LoginView from "./view/LoginView";
import RequireAuth from "./components/RequireAuth";
import SupplierView from "./view/SupplierView";
import { AuthProvider } from "./utils/auth";

const router = createBrowserRouter([
  { path: "/", element: <HomeView />, errorElement: <ErrorView /> },
  {
    path: "/supplier",
    element: (
      <RequireAuth>
        <SupplierView />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <LoginView />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
