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

export const requestValidation = () => ({
  type: "REQUEST_Validation",
});

export const receiveValidation = () => ({
  type: "RECEIVE_Validation",
});

export const receiveValidationError = () => ({
  type: "RECEIVE_Validation_ERROR",
});
