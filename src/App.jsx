import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Register";
import ProductScreen from "./pages/product/[_id]";
import RequireAuth from "../utils/RequireAuth";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Success from "./pages/Success";
import ResetPassword from "./pages/Resetpassword";
import { toast, ToastContainer } from "react-toastify";
import { useContext, useEffect, useRef, useState } from "react";
import { Store } from "../utils/Store";

function App() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const notify = toast;

  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Home notify={notify}></Home>,
    },
    {
      path: "/products",
      element: <Products notify={notify}></Products>,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/shipping",
      element: (
        <RequireAuth>
          <Shipping notify={notify}></Shipping>
        </RequireAuth>
      ),
    },
    {
      path: "/cart",
      element: <Cart notify={notify}></Cart>,
    },
    {
      path: "/product/:id",
      element: <ProductScreen notify={notify}></ProductScreen>,
    },
    {
      path: "/reset-password",
      element: <ResetPassword notify={notify}></ResetPassword>,
    },
  ]);

  return (
    <main className="relative flex justify-center flex-col items-center  ">
      <RouterProvider router={Router}> </RouterProvider>

    </main>
  );
}

export default App;
