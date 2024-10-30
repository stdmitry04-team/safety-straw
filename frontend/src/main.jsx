import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login.jsx";
import { Admin } from "./components/Admin.jsx";
import Checkout from "./components/Checkout.jsx";

//change elements as we develop pages
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/merch", element: <App /> },
  { path: "/bars", element: <App /> },
  { path: "/blog", element: <App /> },
  { path: "/admin", element: <Admin /> },
  { path: "/login", element: <Login /> },
  { path: "/checkout", element: <Checkout /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
