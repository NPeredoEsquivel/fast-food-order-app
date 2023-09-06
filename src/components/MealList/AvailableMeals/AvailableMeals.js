import React, { useState, useEffect } from "react";
import Card from "../../UI/Card/Card";
import classes from "./AvailableMeals.module.scss";
import MealItem from "./MealItem/MealItem";

export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorFetching, setErrorFetching] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://introduction-to-firebase-255ec-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      let loadedMeals = [];

      for (let value in data) {
        loadedMeals.push({
          id: value,
          ...data[value],
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((err) => {
      setErrorFetching(err.message);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && meals.length === 0 && (
        <section className={classes["meals-loading"]}>
          <p>Loading Meals...</p>
        </section>
      )}
      {!isLoading && meals.length === 0 && !errorFetching && (
        <section className={classes["no-meals"]}>
          <p>No meals found...</p>{" "}
        </section>
      )}
      {!isLoading && meals.length === 0 && errorFetching && (
        <section className={classes["meals-error"]}>
          <p>Failed to fetch</p>
          <p>{errorFetching}</p>
        </section>
      )}
      {!isLoading && meals.length !== 0 && (
        <section className={classes["meals"]}>
          <Card>
            <ul>
              {meals.map((singleMeal) => {
                return <MealItem key={singleMeal.id} meal={singleMeal} />;
              })}
            </ul>
          </Card>
        </section>
      )}
    </>
  );
}
