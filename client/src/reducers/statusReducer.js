const initialState = {
  status: "idle",
  paymentPageView: false,
  confirmationPageView: false,
  cartItemTotal: 0,
  subtotal: 0,
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_DATA": {
      return { ...state, status: "loading" };
    }
    case "RECEIVED_DATA": {
      return { ...state, status: "idle" };
    }
    case "RECEIVED_DATA_ERROR": {
      return { ...state, status: "error" };
    }
    case "PAYMENT_PAGE_VISIBLE": {
      const newState = state;
      console.log(state.paymentPageView);
      return { ...newState, paymentPageView: !state.paymentPageView };
    }
    case "CONFIRMATION_PAGE_VISIBLE": {
      return { ...state, confirmationPageView: !state.confirmationPageView };
    }
    case "SET_CART_ITEMS_TOTAL": {
      return { ...state, cartItemTotal: action.total };
    }
    case "SET_SUBTOTAL": {
      return { ...state, subtotal: action.total };
    }
    default:
      return state;
  }
};

export default statusReducer;
