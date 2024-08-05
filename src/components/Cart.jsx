import { useState } from "react";
import Modal from "react-modal";

import { useCartProducts } from "../context/CartContext";
import { useOrderProducts } from "../context/OrderContext";
import CartItem from "./CartItem";
import SkeletonLoader from "./SkeletonLoader";
import { API_URL } from "../const";

Modal.setAppElement("#root");

const Cart = () => {
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { cart, clearCart } = useCartProducts();
  const { orderDetails, resetOrderDetails } = useOrderProducts();

  const totalPrice = cart
    ? cart.reduce((acc, item) => item.quantity * item.price + acc, 0)
    : 0;

  const handleSubmit = async () => {
    const orderData = {
      ...orderDetails,
      items: cart.map((item) => ({ id: item.id, quantity: item.quantity })),
    };

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке данных!");
      }

      const result = await response.json();

      setOrderStatus("success");
      setOrderId(result.order.id);
      clearCart();
      resetOrderDetails();
    } catch (error) {
      setOrderStatus(error);
      console.error(`Ошибка: ${error}!`);
    } finally {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <section className="cart">
      <div className="container cart__container">
        <h2 className="cart__title">
          Корзина{" "}
          <span className="cart__title-count">({cart ? cart.length : 0})</span>
        </h2>

        <ul className="cart__list">
          {cart ? (
            cart.map((item) => <CartItem key={item.id} data={item} />)
          ) : (
            <SkeletonLoader />
          )}
        </ul>

        <div className="cart__summary">
          <h3 className="cart__summary-title">Итого:</h3>
          <p className="cart__summary-total">{totalPrice}&nbsp;₽</p>
          <button className="cart__summary-btn" onClick={handleSubmit}>
            Заказать
          </button>
        </div>
      </div>

      <Modal
        className="modal-cart"
        overlayClassName="modal-cart__overlay"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Product Modal"
      >
        <h2 className="modal-cart__title">
          {orderStatus === "success"
            ? `Заказ успешно отправлен! Номер вашего заказа: ${orderId}`
            : `Произошла ошибка при отправке заказа!`}
        </h2>

        <button className="modal-cart__btn" onClick={closeModal}>
          Закрыть
        </button>
      </Modal>
    </section>
  );
};

export default Cart;
