import React, { useState, useEffect } from "react";
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
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorFetching, setErrorFetching] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://introduction-to-firebase-255ec-default-rtdb.firebaseio.com/meals.json"
        );
        const data = await response.json();

        let loadedMeals = [];

        for (let value in data) {
          loadedMeals.push({
            id: value,
            ...data[value],
          });
        }

        setMeals(loadedMeals);
      } catch (err) {
        setErrorFetching(err);
      }
    };
    setIsLoading(false);
    fetchMeals();
  }, []);

  let mealsResult = <p>Loading...</p>;

  if (!isLoading && meals.length > 0) {
    mealsResult = meals.map((singleMeal) => {
      return <MealItem key={singleMeal.id} meal={singleMeal} />;
    });
  }

  return (
    <section className={classes["meals"]}>
      <Card>
        <ul>{mealsResult}</ul>
      </Card>
    </section>
  );
}
