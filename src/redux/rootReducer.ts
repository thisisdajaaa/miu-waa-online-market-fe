import { combineReducers } from "@reduxjs/toolkit";

import { authenticationReducers } from "./authentication/slices";
import { cartReducer } from "./cart/slices";

const rootReducer = combineReducers({
  authentication: authenticationReducers,
  cart: cartReducer,
});

export { rootReducer };
