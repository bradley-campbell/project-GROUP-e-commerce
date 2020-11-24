export const addItem = (item) => ({
  type: "ADD_ITEM",
  item,
});

export const removeItem = (item) => ({
  type: "REMOVE_ITEM",
  item,
});

export const removeItemCompletely = (item) => ({
  type: "REMOVE_ITEM_COMPLETELY",
  item,
});

export const updateQuantity = (item) => ({
  type: "UPDATE_QUANTITY",
  item,
});

export const setStatus = (status) => ({
  type: "SET_STATUS",
  status,
});
