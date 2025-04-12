import { combineReducers } from "redux";
import cartReducer from "./cartReducer"; // ✅ Ensure this file exists

const rootReducer = combineReducers({
  cart: cartReducer, // ✅ Add more reducers here if needed
});

export default rootReducer;
