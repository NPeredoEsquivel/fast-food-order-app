import React, { useContext, useState, useEffect, useCallback } from "react";
import Modal from "../UI/Modal/Modal";
import ModalContext from "../../store/modal-context";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem/CartItem";
import classes from "./Cart.module.scss";
import Checkout from "./Checkout/Checkout";

export default function Cart() {
  const [toggleCheckoutForm, setToggleCheckoutForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const modalCtx = useContext(ModalContext);
  const cartCtx = useContext(CartContext);

  const modalOffMemoizedCallback = useCallback(() => {
    modalCtx.toggleModalOff();
  }, [modalCtx]);

  const clearCartMemoizedCallback = useCallback(() => {
    cartCtx.clearItems();
  }, [cartCtx]);

  useEffect(() => {
    if (didSubmit) {
      const closeModalTimeout = setTimeout(() => {
        modalOffMemoizedCallback();
        clearCartMemoizedCallback();
        setDidSubmit(false);
        setToggleCheckoutForm(false);
      }, 1000);

      return () => clearTimeout(closeModalTimeout);
    }
  }, [didSubmit, modalOffMemoizedCallback, clearCartMemoizedCallback]);

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

  const toggleCheckoutFormHandler = () => {
    setToggleCheckoutForm(!toggleCheckoutForm);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://introduction-to-firebase-255ec-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
      if (!response.ok) {
        setIsSubmitting(false);
        throw new Error("Something went wrong when submitting the Order");
      }
      setDidSubmit(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  const totalAmountFormatted = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartItems.length > 0;

  const modalActions = (
    <div className={classes["actions"]}>
      <button
        onClick={() => modalCtx.toggleModalOff()}
        className={classes["button--alt"]}
      >
        Close
      </button>
      {hasItems && (
        <button
          className={classes["button"]}
          onClick={toggleCheckoutFormHandler}
        >
          Order{" "}
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <div className={classes["cart-item"]}>
      <ul>{cartItems}</ul>
      <div className={classes["total"]}>
        <span>Total Amount</span>
        <span>{totalAmountFormatted}</span>
      </div>
      {toggleCheckoutForm && (
        <Checkout
          onCancelHandler={toggleCheckoutFormHandler}
          onSubmitForm={submitOrderHandler}
        />
      )}
      {!toggleCheckoutForm && modalActions}
    </div>
  );

  const isSubmittingContent = <p>Sending order data...</p>;
  const didSubmitContent = <p>Order sent successfully</p>;

  return (
    <>
      <Modal>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingContent}
        {!isSubmitting && didSubmit && didSubmitContent}
      </Modal>
    </>
  );
}
