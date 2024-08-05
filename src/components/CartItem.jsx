/* eslint-disable react/prop-types */

import { useState } from "react";

import { API_URL } from "../const";
import { useCartProducts } from "../context/CartContext";

const CartItem = ({ data }) => {
  const [itemQuantity, setItemQuantity] = useState(data.quantity);
  const { updateQuantity, removeFromCart } = useCartProducts();

  const handleDecrease = () => {
    const newQuantity = itemQuantity - 1;
    if (newQuantity > 0) {
      setItemQuantity(newQuantity);
      updateQuantity(data.id, newQuantity);
    } else {
      removeFromCart(data.id);
    }
  };

  const handleIncrease = () => {
    const newQuantity = itemQuantity + 1;
    setItemQuantity(newQuantity);
    updateQuantity(data.id, newQuantity);
  };

  return (
    <li className="cart-item">
      <img
        className="cart-item__img"
        src={`${API_URL}${data.img}`}
        alt={data.title}
      />

      <div className="cart-item__info">
        <h3 className="cart-item__title">{data.title}</h3>

        <div className="cart-item__quantity">
          <button
            className="cart-item__quantity-btn cart-item__quantity-btn_minus"
            onClick={handleDecrease}
          ></button>
          <input
            className="cart-item__quantity-input"
            type="number"
            value={data.quantity}
            readOnly
          />
          <button
            className="cart-item__quantity-btn cart-item__quantity-btn_plus"
            onClick={handleIncrease}
          ></button>
        </div>

        <p className="cart-item__price">{data.price * data.quantity}&nbsp;₽</p>
      </div>
    </li>
  );
};

export default CartItem;
