import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/products";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Shipping from "./pages/shipping";
import Cart from "./pages/cart";
import ProductScreen from "./pages/[Slug]";
import Admin from "./pages/admin/Admin";
import { RequireAuth } from "../utils/RequireAuth";
import Nav from "./component/Nav";
import Additem from "./pages/admin/Additem";

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
      path: "/register",
      element: <Register></Register>,
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
      path: "/cart",
      element: <Cart></Cart>,
    },
    {
      path: "/:slug",
      element: <ProductScreen></ProductScreen>,
    },
    {
      path: "/admin",
      element: (
        <RequireAuth>
          <Admin></Admin>
        </RequireAuth>
      ),
    },
    {
      path: "/sell",
      element: (
        <RequireAuth>
          <Additem></Additem>
        </RequireAuth>
      ),
    },
  ]);

  return (
    <main className=" flex justify-center flex-col items-center ">
      <RouterProvider router={Router}></RouterProvider>
    </main>
  );
}

export default App;
