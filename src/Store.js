import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Redux/Reducers/User.Reducer";
// import comments reducer function here and include it inside of the store
import { cartReducer } from "./Redux/Reducers/Product.Reducer";
export const store = configureStore({
  reducer: { userReducer, cartReducer },
});
