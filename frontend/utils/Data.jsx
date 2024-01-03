/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Datacontext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setdate] = useState({ products: [] });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getitem")
      .then((response) => setdate({ products: response.data.products }));
  }, []);
  return (
    <Datacontext.Provider value={{ data }}>{children}</Datacontext.Provider>
  );
};
