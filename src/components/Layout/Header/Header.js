import React from "react";
import meals from "../../../assets/imgs/meals.jpg";
import classes from "./Header.module.scss";
import HeaderCartButton from "./HeaderCartButton/HeaderCartButton";

export default function Header() {
  return (
    <>
      <header className={classes["header"]}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={meals} alt="meals-alt" />
      </div>
    </>
  );
}
