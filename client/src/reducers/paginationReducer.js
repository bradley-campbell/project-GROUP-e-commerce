const intitialState = { currentP: 1 };

const paginationReducer = (state = intitialState, action) => {
  switch (action.type) {
    case "SET_PAGE": {
      return { ...state, currentP: action.pageNumber };
    }
    default:
      return state;
  }
};
