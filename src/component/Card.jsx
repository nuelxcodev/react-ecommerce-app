/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Store } from "../../utils/Store";
import { useNavigate } from "react-router-dom";

function Item({ product }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const navigate = useNavigate();

  return (
    <div className="relative hover:bg-neutral-300 h-60 md:max-w-[280px] w-[100%] max-w-[180px] m-auto md:w-[100%] md:text-sm overflow-hidden rounded-lg bg-neutral-100 shadow-lg hover:shadow-2xl transition-shadow duration-300  border border-white">
      {/* Product Price Bubble */}
      <span className="absolute flex items-center justify-center shadow-lg left-0 w-16 h-6 bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider z-30">
        ${product.price}
      </span>

      {/* Product Image */}
      <div
        className="cursor-pointer overflow-hidden rounded-lg"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-36 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <section className="py-2 relative ">
        {/* Product Info */}
        <h1 className="text-sm font-bold text-black mb-1 pl-4">{product.name}</h1>
        <hr className="w-8 h-[3px] bg-red-600 my-1 ml-2" />

        <div className=" flex w-full justify-around">
          <div>
            <div className="text-[10px] text-gray-600">
              Brand:{" "}
              <span className="font-semibold text-gray-800">
                {product.brand}
              </span>
            </div>
            <div className="text-[10px] text-gray-600 flex">
              In Stock:{" "}
              <p className="font-semibold text-gray-800 ">
                <span
                  className={
                    product.countInStock > 0
                      ? "text-green-700"
                      : "text-red-600 line-through"
                  }
                >
                  instock
                </span>
              </p>
            </div>
          </div>

          {/* Buy Now Button */}
          <button
            onClick={() => {
              const existingitem = cart.find(
                (item) => item.slug === product.slug
              );
              const quantity = existingitem ? existingitem.quantity + 1 : 1;
              dispatch({
                type: "ADD_ITEM",
                payload: { ...product, quantity },
              });
            }}
            className="text-center text-white 
            bg-pink-700 py-2 px-2 rounded-lg text-xs font-bold
             uppercase tracking-wider shadow-lg transition-all duration-300 hover:bg-pink-900 hover:shadow-xl"
          >
            Buy Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default Item;
