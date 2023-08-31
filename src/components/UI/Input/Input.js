import React from "react";
import classes from "./Input.module.scss";

const Input = ({ label, inputProps }, ref) => {
  return (
    <div className={classes["input"]}>
      <label htmlFor={inputProps.id}>{label}</label>
      <input ref={ref} {...inputProps} />
    </div>
  );
};

export default React.forwardRef(Input);
