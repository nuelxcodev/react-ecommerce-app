/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

export const Store = createContext();

const initialstate = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  user: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const newitem = action.payload;
      const existingitem = state.cart.find(
        (item) => item.slug === newitem.slug
      );
      const cartitem = existingitem
        ? state.cart.map((item) =>
            item.name === existingitem.name ? newitem : item
          )
        : [...state.cart, newitem];
      localStorage.setItem("cart", JSON.stringify(cartitem));
      return { ...state, cart: cartitem };
    }
    case "DELETE_ITEMS": {
      const cartitem = state.cart.filter((x) => x.slug !== action.payload.slug);
      localStorage.setItem("cart", JSON.stringify(cartitem));
      return { ...state, cart: cartitem };
    }

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialstate);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
