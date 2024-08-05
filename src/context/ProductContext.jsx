/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from "react";

import { API_URL } from "../const";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  const categories = {
    tea: "Чай",
    coffe: "Кофе",
    teapot: "Чайники",
    cezves: "Турки",
    other: "Прочее",
  };

  useEffect(() => {
    if (category) {
      fetch(`${API_URL}/api/products/${category}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then((data) => setProducts(data))
        .catch((err) => console.error(`Error fetching products: ${err}!`));
    }
  }, [category]);

  return (
    <ProductContext.Provider value={{ products, setCategory, categories }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
