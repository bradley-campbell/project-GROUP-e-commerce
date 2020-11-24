export const requestData = () => ({
  type: "REQUEST_DATA",
});

export const receiveData = () => ({
  type: "RECEIVE_DATA",
});

export const receiveDataError = () => ({
  type: "RECEIVED_DATA_ERROR",
});

export const togglePaymentView = () => ({
  type: "PAYMENT_PAGE_VISIBLE",
});

export const toggleConfirmationView = () => ({
  type: "CONFIRMATION_PAGE_VISIBLE",
});

export const setCartItemsTotal = (total) => ({
  type: "SET_CART_ITEMS_TOTAL",
  total,
});
