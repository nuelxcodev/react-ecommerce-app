/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { BiCartAlt } from "react-icons/bi";
import { Store } from "../../../utils/Store";

export default function Part() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  return (
    <div className="itmCont">
      <a href="/cart">
        <BiCartAlt size={30} />
        <span className="itmInCart">
          {cart.reduce((a, c) => a + c.quantity, 0)}
        </span>
      </a>
    </div>
  );
}
