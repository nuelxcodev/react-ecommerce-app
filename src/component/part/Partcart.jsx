/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { BiCartAlt } from "react-icons/bi";
import { Store } from "../../../utils/Store";
import { useNavigate } from "react-router-dom";

export default function Part() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const navigate = useNavigate();
  return (
    <div
      className="itemCart"
      style={{ display: "flex" }}
      onClick={() => navigate("/cart")}
    >
      <div className="itmCont">
        <a>
          <BiCartAlt size={30} />
          <span className="itmInCart">
            {cart.reduce((a, c) => a + c.quantity, 0)}
          </span>
        </a>
      </div>
      <span className="hidden">CART</span>
    </div>
  );
}
