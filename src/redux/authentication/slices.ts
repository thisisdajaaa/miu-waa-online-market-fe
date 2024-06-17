import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { UserDetailResponse } from "@/types/server/user";

import { initialAuthenticationState, initialUserDetails } from "./data";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialAuthenticationState,
  reducers: {
    setUserDetails: (state, { payload }: PayloadAction<UserDetailResponse>) => {
      state.userDetails = payload;
    },
    setAccessToken: (state, { payload }: PayloadAction<string>) => {
      state.accessToken = payload;
    },
    setRefreshToken: (state, { payload }: PayloadAction<string>) => {
      state.refreshToken = payload;
    },
    setResetAuthentication: (state) => {
      state.userDetails = initialUserDetails;
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

const { actions: authenticationActions, reducer: authenticationReducers } =
  authenticationSlice;

export { authenticationActions, authenticationReducers };
