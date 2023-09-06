import React, { useState } from "react";
import classes from "./Checkout.module.scss";

const isEmpty = (value) => value.trim() === "";
const validateLength = (value, length) => value.trim().length >= length;

const stateNameTransformer = {
  name: "name",
  streetAddress: "street-address",
  postalCode: "postal-code",
  city: "city",
};

const defaultFormValuesState = {
  [stateNameTransformer.name]: "",
  [stateNameTransformer.streetAddress]: "",
  [stateNameTransformer.postalCode]: "",
  [stateNameTransformer.city]: "",
};

const validationDefaultState = {
  [stateNameTransformer.name]: true,
  [stateNameTransformer.streetAddress]: true,
  [stateNameTransformer.postalCode]: true,
  [stateNameTransformer.city]: true,
};

export default function Checkout({ onCancelHandler, onSubmitForm }) {
  const [formValues, setFormValues] = useState(defaultFormValuesState);
  const [validFormValues, setValidFormValues] = useState(
    validationDefaultState
  );

  const handleOnChangeEvent = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = formValues[stateNameTransformer.name];
    const enteredStreetInfo = formValues[stateNameTransformer.streetAddress];
    const enteredPostalCode = formValues[stateNameTransformer.postalCode];
    const enteredCity = formValues[stateNameTransformer.city];

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetInfoIsValid = !isEmpty(enteredStreetInfo);
    const enteredPostalCodeIsValid =
      !isEmpty(enteredPostalCode) && validateLength(enteredPostalCode, 5);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setValidFormValues({
      [stateNameTransformer.name]: enteredNameIsValid,
      [stateNameTransformer.streetAddress]: enteredStreetInfoIsValid,
      [stateNameTransformer.postalCode]: enteredPostalCodeIsValid,
      [stateNameTransformer.city]: enteredCityIsValid,
    });

    const isFormValid =
      enteredNameIsValid &&
      enteredStreetInfoIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

    if (!isFormValid) {
      return;
    }

    onSubmitForm({
      enteredName,
      enteredStreetInfo,
      enteredPostalCode,
      enteredCity,
    });
    setFormValues(defaultFormValuesState);
  };
  return (
    <form className={classes["form"]} onSubmit={confirmHandler}>
      <div
        className={`${classes["control"]} ${
          !validFormValues[stateNameTransformer.name] && classes["invalid"]
        }`}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={handleOnChangeEvent}
          value={formValues[stateNameTransformer.name]}
        />
        {!validFormValues[stateNameTransformer.name] && (
          <p>Please enter a valid name</p>
        )}
      </div>
      <div
        className={`${classes["control"]} ${
          !validFormValues[stateNameTransformer.streetAddress] &&
          classes["invalid"]
        }`}
      >
        <label htmlFor="street-address">Street address</label>
        <input
          type="text"
          name="street-address"
          onChange={handleOnChangeEvent}
          value={formValues[stateNameTransformer.streetAddress]}
        />
        {!validFormValues[stateNameTransformer.streetAddress] && (
          <p>Please enter a valid street address</p>
        )}
      </div>
      <div
        className={`${classes["control"]} ${
          !validFormValues[stateNameTransformer.postalCode] &&
          classes["invalid"]
        }`}
      >
        <label htmlFor="postal-code">Postal Code</label>
        <input
          type="text"
          name="postal-code"
          onChange={handleOnChangeEvent}
          value={formValues[stateNameTransformer.postalCode]}
        />
        {!validFormValues[stateNameTransformer.postalCode] && (
          <p>Please enter a valid postal code</p>
        )}
      </div>
      <div
        className={`${classes["control"]} ${
          !validFormValues[stateNameTransformer.city] && classes["invalid"]
        }`}
      >
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          onChange={handleOnChangeEvent}
          value={formValues[stateNameTransformer.city]}
        />
        {!validFormValues[stateNameTransformer.city] && (
          <p>Please enter a valid city</p>
        )}
      </div>
      <div className={classes["actions"]}>
        <button type="button" onClick={onCancelHandler}>
          Cancel
        </button>
        <button className={classes["submit"]} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
}
