import { UserDetailResponse } from "@/types/server/user";

import { authenticationActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const {
  setUserDetails,
  setAccessToken,
  setRefreshToken,
  setResetAuthentication,
} = authenticationActions;

const callSetUserDetails =
  (details: UserDetailResponse): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setUserDetails(details));
  };

const callSetAccessToken =
  (accessToken: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAccessToken(accessToken));
  };

const callSetRefreshToken =
  (refreshToken: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setRefreshToken(refreshToken));
  };

const callSetResetAuthentication = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(setResetAuthentication());
};

const actions = {
  callSetUserDetails,
  callSetAccessToken,
  callSetRefreshToken,
  callSetResetAuthentication,
};

export default actions;
