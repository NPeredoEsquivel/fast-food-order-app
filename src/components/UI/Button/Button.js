import React from "react";
import classes from "./Button.module.scss";

export default function Button({ className, children, onClickEventHandler }) {
  return (
    <button
      className={`${classes["button"]} ${className ? className : ""}`}
      onClick={onClickEventHandler}
    >
      {children}
    </button>
  );
}
