import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Store } from "../../utils/Store";
import { useNavigate } from "react-router-dom";
import Nav from "../component/Nav";
import PaymentForm from "../component/checkoutform";
import { useAuth } from "../../utils/Auth";
import Success from "./Success";
import Failure from "./Failure";

function Shipping() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { cart } = state;

  const auth = useAuth();
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [message, setmessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userinfo, setUserInfo] = useState({});

  const onSubmit = (data) => {
    setUserInfo(data);
  };

  const shippingFEE = 20;
  let total = cart.reduce((a, c) => a + c.quantity * c.price, shippingFEE);

  const handleFailure = () => {
    setFailure(true);
    setSuccess(false);
  };

  const handleSuccess = () => {
    setSuccess(true);
    setFailure(false);
  };

  return (
    <div>
      <Nav />
      {success ? (
        <Success />
      ) : failure ? (
        <Failure func={() => setFailure(false)} message={message} />
      ) : (
        <div className="container my-20 mx-auto md:p-6 grid grid-cols-1 lg:grid-cols-3 md:gap-6">
          <div className="col-span-2 bg-white p-6 rounded-lg md:shadow-md">
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
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
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
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
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
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
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
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
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
                    <p className="text-red-500 text-sm">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zip Code
                  </label>
                  <input
                    {...register("zipCode", {
                      required: "Zip Code is required",
                    })}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Enter your zip code"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-pink-700 hover:bg-pink-800 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Submit Shipping Details
              </button>
            </form>
          </div>
          <div className="md:bg-neutral-200 md:p-6 md:rounded-lg md:shadow-md">
            <PaymentForm
              data={{
                price: total,
                email: auth?.user?.email,
              }}
              isFailure={handleFailure}
              isSuccesful={handleSuccess}
              setmessage={(mss) => setmessage(mss)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Shipping;
