import React from "react";
import ReactDOM from "react-dom/client";

import { ProductProvider } from "./context/ProductContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import App from "./App.jsx";

import "normalize.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);
