import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//change elements as we develop pages
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/merch", element: <App /> },
  { path: "/bars", element: <App /> },
  { path: "/blog", element: <App /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
