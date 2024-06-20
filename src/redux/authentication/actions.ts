import type { UserDetailResponse } from "@/types/server/user";

import { authenticationActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { setUserDetails, setResetAuthentication } = authenticationActions;

const callSetUserDetails =
  (userDetails: UserDetailResponse): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setUserDetails(userDetails));
  };

const callSetResetAuthentication = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(setResetAuthentication());
};

const actions = {
  callSetUserDetails,
  callSetResetAuthentication,
};

export default actions;
