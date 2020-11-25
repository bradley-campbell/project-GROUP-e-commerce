import cartReducer from "./cartReducer";
import statusReducer from "./statusReducer";
import paginationReducer from "./paginationReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  viewState: statusReducer,
  cartState: cartReducer,
  pagination: paginationReducer,
});

export default allReducers;

