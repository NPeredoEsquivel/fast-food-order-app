import React, { useContext } from "react";
import Modal from "../UI/Modal/Modal";
import ModalContext from "../../store/modal-context";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem/CartItem";
import classes from "./Cart.module.scss";

export default function Cart() {
  const modalCtx = useContext(ModalContext);
  const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = cartCtx.items.map((singleCartItem) => {
    return (
      <CartItem
        key={singleCartItem.id}
        name={singleCartItem.name}
        price={singleCartItem.price}
        amount={singleCartItem.amount}
        onRemove={cartItemRemoveHandler.bind(null, singleCartItem.id)}
        onAdd={cartItemAddHandler.bind(null, singleCartItem)}
      />
    );
  });

  if (!modalCtx.isModalVisible) {
    return <></>;
  }

  const totalAmountFormatted = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartItems.length > 0;
  return (
    <>
      <Modal>
        <div className={classes["cart-item"]}>
          <ul>{cartItems}</ul>
          <div className={classes["total"]}>
            <span>Total Amount</span>
            <span>{totalAmountFormatted}</span>
          </div>
          <div className={classes["actions"]}>
            <button
              onClick={() => modalCtx.toggleModalOff()}
              className={classes["button--alt"]}
            >
              Close
            </button>
            {hasItems && <button className={classes["button"]}>Order </button>}
          </div>
        </div>
      </Modal>
    </>
  );
}
