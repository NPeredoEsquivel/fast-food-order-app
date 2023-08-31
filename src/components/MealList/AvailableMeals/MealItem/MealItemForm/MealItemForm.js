import React, { useRef, useState } from "react";
import Input from "../../../../UI/Input/Input";
import classes from "./MealItemForm.module.scss";

export default function MealItemForm({ id, onAddToCarts }) {
  const amountRef = useRef();
  const [isInputValid, setIsInputValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();
    const inputAmount = amountRef.current.value;
    const inputAmountFormatted = +inputAmount;

    if (
      inputAmount.trim().length === 0 ||
      inputAmountFormatted < 1 ||
      inputAmountFormatted > 5
    ) {
      setIsInputValid(false);
      return;
    }

    onAddToCarts(inputAmountFormatted);
  };
  return (
    <form onSubmit={submitHandler} className={classes["form"]}>
      <Input
        ref={amountRef}
        label="Amount"
        inputProps={{
          id: "amount_" + id,
          type: "number",
          min: 0,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button type="submit">+ Add</button>
      {!isInputValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
}
