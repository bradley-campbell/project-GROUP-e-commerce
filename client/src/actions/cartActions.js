export const addItem = (item) => ({
  type: "ADD_ITEM",
  item,
});
export const removeItem = (item) => ({
  type: "REMOVE_ITEM",
  item,
});
export const incrementItem = (item) => ({
  type: "INCREMENT_ITEM",
  item,
});
export const decrementItem = (item) => ({
  type: "DECREMENT_ITEM",
  item,
});
export const clearCart = () => ({
  type: "CLEAR_CART",
});
