import React, { useContext } from "react";
import CartContext from "../../../../store/cart-context";
import MealItemForm from "./MealItemForm/MealItemForm";
import classes from "./MealItem.module.scss";

export default function MealItem({ meal }) {
  const price = `$${meal.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);

  const addItemToCartEvent = (amount) => {
    cartCtx.addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      amount,
    });
  };
  return (
    <li className={classes["meal"]}>
      <div>
        <h3>{meal.name}</h3>
        <div className={classes["description"]}>{meal.description}</div>
        <div className={classes["price"]}>{price}</div>
      </div>
      <div>
        <MealItemForm id={meal.id} onAddToCarts={addItemToCartEvent} />
      </div>
    </li>
  );
}
