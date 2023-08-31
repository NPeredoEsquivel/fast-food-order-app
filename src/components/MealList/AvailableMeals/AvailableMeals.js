import React from "react";
import Card from "../../UI/Card/Card";
import classes from "./AvailableMeals.module.scss";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

export default function AvailableMeals() {
  const availableMeals = DUMMY_MEALS.map((singleMeal) => {
    return <MealItem key={singleMeal.id} meal={singleMeal} />;
  });

  return (
    <section className={classes["meals"]}>
      <Card>
        <ul>{availableMeals}</ul>
      </Card>
    </section>
  );
}
