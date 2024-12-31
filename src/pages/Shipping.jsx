import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Store } from "../../utils/Store";
import { useNavigate } from "react-router-dom";
import Nav from "../component/Nav";
import axios from "axios";
import PaymentForm from "../component/checkoutform";
import { useAuth } from "../../utils/Auth";

function Shipping() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const auth = useAuth();

  console.log(auth?.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState("");
  const [userinfo, setuserinfo] = useState({});
  const onSubmit = async (data) => {
    // console.log("Form Data:", data);
    // // Dispatch the shipping details to the store or navigate to the next step
    // dispatch({ type: "SAVE_SHIPPING_DETAILS", payload: data });
    // navigate("/payment");
    setuserinfo(data);
  };

  const shippingFEE = 20;
  let total = cart.reduce((a, c) => a + c.quantity * c.price, shippingFEE);

  return (
    <div className="container my-20 mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Nav />
      {/* Shipping Form */}
      <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Country Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Shipping Country
            </label>
            <select
              {...register("country", { required: "Country is required" })}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select a country</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          {/* First and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                {...register("firstName", {
                  required: "First Name is required",
                })}
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                {...register("lastName", { required: "Last Name is required" })}
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              {...register("address", { required: "Address is required" })}
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          {/* City, State, Zip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                {...register("city", { required: "City is required" })}
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your city"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                {...register("state", { required: "State is required" })}
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your state"
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code
              </label>
              <input
                {...register("zipCode", { required: "Zip Code is required" })}
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your zip code"
              />
              {errors.zipCode && (
                <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
              )}
            </div>
          </div>
          {/* Order Summary */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-700 hover:bg-pink-800 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Submit Shipping Details
          </button>
        </form>
      </div>
      <div className="bg-neutral-200 p-6 rounded-lg shadow-md">
        <PaymentForm
          data={{
            price: cart.reduce(
              (total, item) => total + item.quantity * item.price,
              0
            ),
            email: auth?.user.email,
          }}
        />
      </div>
    </div>
  );
}

export default Shipping;
