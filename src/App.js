import React from "react";
import Header from "./components/Layout/Header/Header";
import MealList from "./components/MealList/MealList";
import Cart from "./components/Cart/Cart";
import { ModalContextProvider } from "./store/modal-context";
import { CartContextProvider } from "./store/cart-context";

function App() {
  return (
    <CartContextProvider>
      <ModalContextProvider>
        <Cart />
        <Header />
        <main>
          <MealList />
        </main>
      </ModalContextProvider>
    </CartContextProvider>
  );
}

export default App;
