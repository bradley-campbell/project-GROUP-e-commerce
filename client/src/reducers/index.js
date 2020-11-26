import cartReducer from "./cartReducer";
import statusReducer from "./statusReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  viewState: statusReducer,
  cartState: cartReducer,
});

export default allReducers;
