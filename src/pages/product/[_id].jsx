/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { Store } from "../../../utils/Store";
import Nav from "../../component/Nav";
import { Datacontext } from "../../../utils/Data";
import {
  FaShoppingCart,
  FaTag,
  FaBoxOpen,
  FaInfoCircle,
  FaCogs,
  FaShieldAlt,
} from "react-icons/fa";
import { BsDeviceSsd } from "react-icons/bs";
import { CgSmartphoneRam } from "react-icons/cg";
import { GiProcessor, GiRam } from "react-icons/gi";
import { GrStorage } from "react-icons/gr";
import Item from "../../component/Card";

// Utility function to check if the product is a gadget
function isGadget(product) {
  return product.processor && product.RAM && product.storage;
}

function ProductScreen() {
  const { data } = useContext(Datacontext);
  const { state, dispatch } = useContext(Store);
  const { user } = state;

  const location = useLocation();
  const seeachId = location.pathname.slice("/product".length);

  const product = data.products.find(
    (product) => product._id === seeachId.slice(1)
  );
  const products = data.products.find((x) => x._id === product._id);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="text-center text-red-500 text-xl">
        Product not available
      </div>
    );
  }

  const addToCartHandler = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...product, quantity },
    });
  };

  return (
    <div className="flex-1">
      <Nav />
      <div className="container mx-auto md:p-6 h-screen flex-1 justify-center items-center bg-gray-50 text-sm">
        <div className=" mt-11 grid grid-cols-1 lg:grid-cols-2 gap-12 shadow-lg rounded-lg bg-white p-6 sm:text-xs">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-24 object-cover border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              />
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-24 object-cover border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              />
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-24 object-cover border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              />
            </div>
          </div>
          {/* Product Details */}
          <div className="space-y-6">
            <div className="border-b pb-4 flex justify-between">
              <h1 className="text-4xl font-extrabold text-gray-800 flex items-center space-x-2">
                {product.name}
              </h1>
              <h2 className="text-3xl font-semibold text-indigo-600 flex items-center space-x-2">
                <FaTag className="text-pink-500" />
                <span>${product.price}</span>
              </h2>
            </div>

            <div className="flex items-start space-x-2 text-gray-600">
              <FaInfoCircle className="text-gray-500 mt-1" />
              <p className="leading-relaxed">{product.description}</p>
            </div>

            <div className=" flex gap-14">
              {/* Product Color */}
              {product.color && (
                <div className="flex items-center space-x-4">
                  <label className="font-semibold text-gray-700">Color:</label>
                  <div
                    className="w-8 h-8 rounded-full border shadow"
                    style={{ backgroundColor: product.color }}
                  ></div>
                </div>
              )}
              <div className="flex items-center space-x-2 text-gray-700">
                <FaBoxOpen className="text-green-500" />
                <span>
                  <b>In stock:</b>{" "}
                  <span
                    className={
                      product.countInStock > 0
                        ? "text-green-700"
                        : "text-red-700 line-through"
                    }
                  >
                    instock
                  </span>
                </span>
              </div>
            </div>

            {/* Gadget Details (Processor, RAM, Storage) */}

            {isGadget(product) && (
              <div>
                <ul className="flex items-center gap-10">
                  {product.processor && (
                    <li className="flex items-center  flex-col">
                      <GiProcessor size={40} />
                      <span>{product.processor}</span>
                    </li>
                  )}
                  {product.RAM && (
                    <li className="flex items-center flex-col">
                      <CgSmartphoneRam size={40} />
                      <span>{product.RAM}</span>
                    </li>
                  )}
                  {product.storage && (
                    <li className="flex items-center  flex-col">
                      <BsDeviceSsd size={40} />
                      <span>{product.storage}</span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Key Features */}
            {product.keyFeatures && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Features:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  {product.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <FaCogs className="text-blue-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Material */}
            {product.material && (
              <div className="flex items-center space-x-2">
                <FaShieldAlt className="text-gray-500" />
                <span>
                  <b>Material:</b> {product.material}
                </span>
              </div>
            )}

            {/* Water Resistance */}
            {product.waterResistance && (
              <div className="flex items-center space-x-2">
                <FaShieldAlt className="text-blue-500" />
                <span>
                  <b>Water Resistance:</b> {product.waterResistance}
                </span>
              </div>
            )}

            <div className=" flex justify-between">
              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <label className="font-semibold text-gray-700">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border rounded-lg bg-white text-gray-700">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        Math.min(prev + 1, products.countInStock)
                      )
                    }
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div>
                <button
                  onClick={addToCartHandler}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all flex items-center space-x-2"
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
