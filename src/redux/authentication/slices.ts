import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialAuthenticationState } from "./data";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialAuthenticationState,
  reducers: {
    setAccessToken: (state, { payload }: PayloadAction<string>) => {
      state.accessToken = payload;
    },
    setRefreshToken: (state, { payload }: PayloadAction<string>) => {
      state.refreshToken = payload;
    },
    setResetAuthentication: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

const { actions: authenticationActions, reducer: authenticationReducers } =
  authenticationSlice;

export { authenticationActions, authenticationReducers };
