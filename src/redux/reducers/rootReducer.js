import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import inventoryReducer from "./inventoryReducer";

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  cart: cartReducer,
});

export default rootReducer;
