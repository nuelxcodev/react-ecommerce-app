/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Datacontext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setdate] = useState({ products: [] });
  const [isloading, setisloading] = useState(false);

  function Apigetdata() {
    setisloading(true);
    axios.get("https://nuelmartapi.onrender.com/api/getitem").then((response) => {
      response && setisloading(false);
      setdate({ products: response.data });
    });
  }

  useEffect(() => {
    Apigetdata();
  }, []);
  // Apigetdata()

  return (
    <Datacontext.Provider value={{ data , isloading }}>{children}</Datacontext.Provider>
  );
};
