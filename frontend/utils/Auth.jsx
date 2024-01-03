/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { Store } from "./Store";
import { useNavigate } from "react-router-dom";

const Authcontext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { state, dispatch } = useContext(Store);
  const { user } = state;
 

  const login = (user) => {
    dispatch({ type: "USER", payload: user });
   
  };
  const logout = () => {
    dispatch({ type: "USER", payload: null });
  };
  return (
    <Authcontext.Provider value={{ user, login, logout }}>
      {children}
    </Authcontext.Provider>
  );
};
export const useAuth = () => {
  return useContext(Authcontext);
};
