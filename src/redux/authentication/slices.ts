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
    setResetAuthentication: (state) => {
      state.userDetails = initialUserDetails;
    },
  },
});

const { actions: authenticationActions, reducer: authenticationReducers } =
  authenticationSlice;

export { authenticationActions, authenticationReducers };
