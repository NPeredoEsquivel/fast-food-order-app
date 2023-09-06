import React, { useContext, useEffect, useState } from "react";
import ModalContext from "../../../../store/modal-context";
import CartContext from "../../../../store/cart-context";
import CartIcon from "../../../Cart/CartIcon/CartIcon";
import classes from "./HeaderCartButton.module.scss";

export default function HeaderCartButton() {
  const modalCtx = useContext(ModalContext);
  const cartCtx = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const { items } = cartCtx;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const hightlightTimeout = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => clearTimeout(hightlightTimeout);
  }, [items]);

  const itemsAmount = items.reduce((acc, current) => {
    return acc + current.amount;
  }, 0);

  const btnClasses = `${classes["button"]} ${
    btnIsHighlighted ? classes["bump"] : ""
  } `;
  return (
    <button onClick={() => modalCtx.toggleModalOn()} className={btnClasses}>
      <span className={classes["icon"]}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes["badge"]}>{itemsAmount}</span>
    </button>
  );
}
