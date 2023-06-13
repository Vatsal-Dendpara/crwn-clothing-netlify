import { createAction } from "../../utils/reducer/reducer.util";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, boolean);

export const addToCart = (cartItems, productToAdd) => {
  const existingCartItems = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (existingCartItems) {
    return cartItems.map((item) => {
      return item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const existingCartItems = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (existingCartItems.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }

  return cartItems.map((item) => {
    return item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item;
  });
};

export const clearCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((item) => item.id !== cartItemToRemove.id);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addToCart(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemsFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeItemFromCart(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
