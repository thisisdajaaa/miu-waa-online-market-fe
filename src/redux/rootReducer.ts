import { combineReducers } from "@reduxjs/toolkit";

import { authenticationReducers } from "./authentication/slices";

const rootReducer = combineReducers({
  authentication: authenticationReducers,
});

export { rootReducer };
