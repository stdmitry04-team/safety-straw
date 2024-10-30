import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import { Admin } from "./components/admin.jsx";

=======
import Login from "./components/Login.jsx";
import { Admin } from "./components/Admin.jsx";
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f
//change elements as we develop pages
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/merch", element: <App /> },
  { path: "/bars", element: <App /> },
  { path: "/blog", element: <App /> },
  { path: "/admin", element: <Admin /> },
<<<<<<< HEAD
=======
  { path: "/login", element: <Login /> },
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
