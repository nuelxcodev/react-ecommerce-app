/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Store } from "../../utils/Store";
import { useNavigate } from "react-router-dom";

function Item({ product }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const navigate = useNavigate();

  return (
    <div>
      <div className="item-container">
        <div>
          <div className="item-image">
            <img
              src={product.image}
              alt={product.name}
              onClick={() => {
                navigate(`/${product.slug}`);
              }}
            />
          </div>
          <section className="item-cont">
            <div className="item-info">
              <div>
                name: <span>{product.name}</span>
              </div>
              <div>
                brand: <span>{product.brand}</span>
              </div>
              <div>
                {" "}
                price: $<span>{product.price}</span>
              </div>
              <div>
                InStock: <span>{product.countInStock}</span>
              </div>
            </div>
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
            >
              buy now
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Item;
