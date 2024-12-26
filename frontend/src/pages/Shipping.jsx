import { useContext, useState } from "react";
import { Store } from "../../utils/Store";
import { useNavigate } from "react-router-dom";
import Nav from "../component/Nav";


function Shipping() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { cart, location } = state;

  const [shippingLocation, setShipLocation] = useState({});
  const shippingFEE = 20;
  let total = cart.reduce((a, c) => a + c.quantity * c.price, shippingFEE);

  return (
    <div className="container my-20 mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
     <Nav/>
      {/* Shipping Form */}
      <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>

        <form className="space-y-4">
          {/* Country Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Shipping Country
            </label>
            <select className="w-full border border-gray-300 rounded-lg p-2">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
          </div>

          {/* Shipping Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter your address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your city"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your state"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your zip code"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Your Order</h2>

        {/* Discount Code */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter discount code"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg">
              Apply
            </button>
          </div>
        </div>

        {/* Payment Details */}
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2">Payment Details</h3>
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span>Subtotal:</span>
            <span>${cart.reduce((a, c) => a + c.quantity * c.price, 0)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span>Shipping Fee:</span>
            <span>${shippingFEE}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold text-gray-800">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </div>

        {/* Payment Button */}
        <button className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg">
          Submit Payment (${total})
        </button>
      </div>
    </div>
  );
}

export default Shipping;
