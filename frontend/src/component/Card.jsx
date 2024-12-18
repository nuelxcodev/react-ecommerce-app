/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Store } from "../../utils/Store";
import { useNavigate } from "react-router-dom";

function Item({ product }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const navigate = useNavigate();

  return (
    <div className="relative w-[280px]  p-6 rounded-lg bg-neutral-100 shadow-lg hover:shadow-2xl transition-shadow duration-300  border border-white">
      {/* Product Price Bubble */}
      <span className="absolute flex items-center justify-center shadow-lg left-0 w-16 h-6 bg-red-600 text-white text-xs font-bold uppercase tracking-wider z-30">
        ${product.price}
      </span>

      {/* Product Image */}
      <div
        className="cursor-pointer overflow-hidden rounded-lg"
        onClick={() => navigate(`/${product.slug}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-36 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <section >
        {/* Product Info */}
        <h1 className="text-lg font-bold text-black mb-1">{product.name}</h1>
        <hr className="w-8 h-[3px] bg-red-600 my-1" />
        <p className="text-sm text-gray-600">
          Brand: <span className="font-semibold text-gray-800">{product.brand}</span>
        </p>
        <p className="text-sm text-gray-600">
          In Stock: <span className="font-semibold text-gray-800">{product.countInStock}</span>
        </p>

        {/* Buy Now Button */}
        <button
          onClick={() => {
            const existingitem = cart.find((item) => item.slug === product.slug);
            const quantity = existingitem ? existingitem.quantity + 1 : 1;
            dispatch({
              type: "ADD_ITEM",
              payload: { ...product, quantity },
            });
          }}
          className="mt-2 w-full text-center text-white bg-neutral-800 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-300 hover:bg-blue-800 hover:shadow-xl"
        >
          Buy Now
        </button>
      </section>
    </div>
  );
}

export default Item;
