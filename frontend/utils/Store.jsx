/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();

const initialstate = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,

  location: localStorage.getItem("location")
    ? JSON.parse(localStorage.getItem("location"))
    : [],

  history: localStorage.getItem("history")
    ? JSON.parse(localStorage.getItem("history"))
    : [],

  data: [],
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
    case "RESET_CART": {
      localStorage.setItem("cart", []);
      return { ...state, cart: [] };
    }
    case "LOCATION": {
      const location = action.payload;
      localStorage.setItem("location", JSON.stringify(location));
      return { ...state, location: location };
    }
    case "HISTORY": {
      const history = action.payload;
      localStorage.setItem("history", JSON.stringify(history));
      return { ...state, history: history };
    }
    case "USER": {
      const user = action.payload;
      Cookies.set("user", JSON.stringify(user));
      return { ...state, user: user };
    }
    case "DATA": {
      return { ...state, data: action.payload };
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
