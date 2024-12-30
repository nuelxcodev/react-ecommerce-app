import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Register";
import ProductScreen from "./pages/product/[_id]";
import RequireAuth from "../utils/RequireAuth";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";


function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
    },
    {
      path: "/products",
      element: <Products></Products>,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/shipping",
      element: (
        <RequireAuth>
          <Shipping></Shipping>
        </RequireAuth>
      ),
    },
    {
      path: "/cart" ,
      element: <Cart></Cart>,
    },
    {
      path: "/product/:id",
      element: <ProductScreen></ProductScreen>,
    },
   
  ]);

  return (
    <main className=" flex justify-center flex-col items-center  ">
      <RouterProvider router={Router}></RouterProvider>
    </main>
  );
}

export default App;
