const initialState = {
  status: "idle",
  paymentPageView: false,
  confirmationPageView: false,
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
    default:
      return state;
  }
};

export default statusReducer;
