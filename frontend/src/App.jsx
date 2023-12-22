import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/products";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Shipping from "./pages/shipping";
import Cart from "./pages/cart";

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
      element: <Shipping></Shipping>,
    },
    {
      path: "/cart",
      element: <Cart></Cart>,
    },
  ]);
  return (
    <main>
      <RouterProvider router={Router}></RouterProvider>
    </main>
  );
}

export default App;
