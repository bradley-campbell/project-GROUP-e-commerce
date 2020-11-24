const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        [action.item.id]: {
          ...action.item,
          quantity: state[action.item.id]
            ? state[action.item.id].quantity + 1
            : 1,
        },
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        [action.item.id]: {
          ...action.item,
          quantity: state[action.item.id].quantity - 1,
        },
      };
    }
    case "REMOVE_ITEM_COMPLETELY": {
      const stateCopy = { ...state };
      console.log(stateCopy);
      delete stateCopy[action.item.id];
      return {
        ...stateCopy,
      };
    }
    case "UPDATE_QUANTITY": {
      return {
        ...state,
        [action.item.id]: {
          ...action.item,
          quantity: action.item.quantity,
        },
      };
    }

    default:
      return state;
  }
}

export const getStoreItemArray = (state) => Object.values(state);
