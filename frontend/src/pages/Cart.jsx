import { useContext } from "react";
import { Store } from "../../utils/Store";
import { BiTrash } from "react-icons/bi";
import Nav2 from "../component/Nav2";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { cart, user } = state;
  return (
    <div className="container">
      <Nav2 />
      {state.cart.length === 0 ? (
        <div>
          <div>no item</div>
        </div>
      ) : (
        <div>
          <div>
            {cart.map((Item) => (
              <div key={Item.slug} className="cart-container">
                <div className="cart-itemBox">
                  <img src={Item.image} alt={Item.name} />

                  <div>
                    <b>name:</b> {Item.name}
                  </div>
                  <div className="quantity">
                    <b>quantity:</b>
                    <select
                      value={Item.quantity}
                      onChange={(e) => {
                        let value = Number(e.target.value);
                        const existingitem = cart.find(
                          (x) => x.slug === Item.slug
                        );
                        const quantity = existingitem
                          ? (existingitem.quantity = value)
                          : existingitem;
                        dispatch({
                          type: "ADD_ITEM",
                          payload: Item,
                          quantity,
                        });
                      }}
                    >
                      *
                      {[...Array(Item.countInStock).keys()].map((x) => (
                        <option key={x}>{x + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    {" "}
                    <b>price:</b>${Item.price}
                  </div>
                  <div>
                    <BiTrash
                      size={20}
                      onClick={() => {
                        dispatch({ type: "DELETE_ITEMS", payload: Item });
                        
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout">
            <div className="checkoutdisplay">
              <div>
                <p>
                  total price:
                  <b>${cart.reduce((a, c) => a + c.quantity * c.price, 0)}</b>
                </p>
                <p>
                  total items: <b>{cart.reduce((a, c) => a + c.quantity, 0)}</b>
                </p>
              </div>
            </div>
            <input
              type="button"
              value="checkout"
              onClick={() => {
                user.length === 0 ? navigate("/login") : navigate("/shipping");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
