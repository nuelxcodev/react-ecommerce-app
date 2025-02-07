/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/Store";
import { BiTrash } from "react-icons/bi";
import Nav from "../component/Nav";
import { useNavigate } from "react-router-dom";

export default function Cart({ notify }) {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const numOfItem = cart.reduce((a, b) => a + b.quantity, 0);
  const [newnumofitems, setnewnum] = useState(0);
  const [itemstoast, setitemtoast] = useState({});
  // const curritemqnt = cart.find(x=> x._id === itemstoast._id)
  const current_cart_lenght = newnumofitems;

  console.log(itemstoast.item);
  useEffect(() => {
    if (itemstoast.value && numOfItem > current_cart_lenght) {
      notify.success(
        `${itemstoast.value - itemstoast.item.quantity} more ${
          itemstoast.item.name
        } added to cart`
      );
    }
    if (numOfItem < current_cart_lenght) {
      notify.success(
        `${current_cart_lenght - numOfItem} items has been removed to cart`
      );
    }
    setnewnum(numOfItem);
  }, [numOfItem]);

  return (
    <div className="flex justify-center items-center h-screen bg-neutral-200 font-sans text-sm  w-full">
      <Nav />
      <div className="flex justify-center md:items-center ">
        <div
          style={{ width: "min(900px, 100vw)" }}
          className="mt-16 flex flex-wrap md:overflow-hidden  border-white bg-white md:rounded-lg md:shadow-lg"
        >
          {/* Cart Items Section */}
          <div className="w-full md:w-2/3 p-5">
            <div className="mb-5">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-bold">Shopping Cart</h4>
                <div className="text-gray-500">{cart.length} items</div>
              </div>
            </div>
            {cart.length === 0 ? (
              <div className="flex flex-col items-center text-gray-600">
                <p className="text-2xl font-semibold">Your cart is empty</p>
                <button
                  className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500"
                  onClick={() => navigate("/")}
                >
                  Go Shopping
                </button>
              </div>
            ) : (
              <div className="overflow-y-auto max-h-72 max-md:pb-10 hidescroll">
                {" "}
                {/* Makes it scrollable */}
                {cart.map((item) => (
                  <div
                    key={item.slug}
                    className="flex items-center justify-between border-b py-4"
                  >
                    <div className="w-16">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-16 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 px-4">
                      <p className="text-gray-500">{item.name}</p>
                      <p className="text-lg font-semibold">
                        Price: ${item.price}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <select
                        value={item.quantity}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          dispatch({
                            type: "ADD_ITEM",
                            payload: { ...item, quantity: value },
                          });
                          setitemtoast({ value, item });
                        }}
                        className="border border-gray-300 rounded-md py-1 px-2"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        className="ml-4 text-gray-500 hover:text-red-700"
                        onClick={() =>
                          dispatch({ type: "DELETE_ITEMS", payload: item })
                        }
                      >
                        <BiTrash size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-10">
              <button className="text-gray-500" onClick={() => navigate("/")}>
                &larr; Back to shop
              </button>
            </div>
          </div>
          {/* Summary Section */}
          <div className="w-full md:w-1/3 bg-stone-800 text-white text-opacity-40 p-5">
            <h5 className="text-lg font-bold">Summary</h5>
            <hr className="my-4" />
            <div className="flex justify-between">
              <div>ITEMS {cart.length}</div>
              <div>
                $
                {cart.reduce(
                  (total, item) => total + item.quantity * item.price,
                  0
                )}
              </div>
            </div>
            <form className="my-4">
              <label className="block mb-2">SHIPPING</label>
              <select className="w-full border p-2 bg-transparent">
                <option>Standard-Delivery- $5.00</option>
              </select>
            </form>
            <div className="flex justify-between border-t py-4">
              <div>TOTAL PRICE</div>
              <div>
                $
                {cart.reduce(
                  (total, item) => total + item.quantity * item.price,
                  5
                )}
              </div>
            </div>
            <button
              className="w-full bg-black text-white py-2"
              onClick={() => navigate("/shipping")}
            >
              CHECKOUT
            </button>
            <button
              className="w-full mt-4 px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-400"
              onClick={() => dispatch({ type: "RESET_CART" })}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
