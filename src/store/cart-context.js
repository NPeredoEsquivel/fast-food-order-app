import React, { useReducer } from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const findExistingItemIndex = (items, id) => {
  return items.findIndex((singleItem) => singleItem.id === id);
};

const cartReducer = (state, action) => {
  let indexItem;
  let updatedItems;
  switch (action.type) {
    case "ADD":
      indexItem = findExistingItemIndex(state.items, action.item.id);
      const { price, amount } = action.item;
      const newAmount = state.totalAmount + price * amount;

      if (indexItem === -1) {
        updatedItems = [...state.items, action.item];
      } else {
        let itemFound = state.items[indexItem];

        let updatedItem = {
          ...itemFound,
          amount: itemFound.amount + action.item.amount,
        };

        updatedItems = [...state.items];
        updatedItems[indexItem] = updatedItem;
      }

      return {
        items: updatedItems,
        totalAmount: newAmount,
      };
    case "REMOVE":
      indexItem = findExistingItemIndex(state.items, action.id);

      let itemFound = state.items[indexItem];

      if (itemFound.amount === 1) {
        updatedItems = [
          ...state.items.splice(0, indexItem),
          ...state.items.splice(indexItem + 1),
        ];
      } else {
        let updatedItem = {
          ...itemFound,
          amount: itemFound.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[indexItem] = updatedItem;
      }
      const updatedTotalAmount = state.totalAmount - itemFound.price;

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    default:
      return defaultCartState;
  }
};

export const CartContextProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHadler = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };
  const removeItemFromCartHadler = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHadler,
    removeItem: removeItemFromCartHadler,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
