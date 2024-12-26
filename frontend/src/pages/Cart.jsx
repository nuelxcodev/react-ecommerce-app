/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Store } from "../../utils/Store";
import { BiTrash } from "react-icons/bi";
import Nav from "../component/Nav";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  return (
    <div className="flex justify-center items-center h-screen bg-neutral-200 font-sans text-sm font-bold w-full">
      <Nav />
      <div className="card w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden ">
        <div className="flex flex-wrap border border-white">
          {/* Cart Items Section */}
          <div className="w-full md:w-2/3 p-5 lg:h-[50vh] h-[45vh]  ">
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
              <div className="overflow-scroll lg:h-full hidescroll">
                {cart.map((item) => (
                  <div
                    key={item.slug}
                    className="flex items-center justify-between border-b py-4 over"
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
                    <div className="flex items-center">
                      <span className="ml-4 text-gray-500 cursor-pointer">
                        &#10005;
                      </span>
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
              <label className="block mt-4 mb-2">GIVE CODE</label>
              <input
                id="code"
                className="w-full border p-2 bg-transparent"
                placeholder="Enter your code"
              />
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
