import { authenticationActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { setAccessToken, setRefreshToken, setResetAuthentication } =
  authenticationActions;

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
  callSetAccessToken,
  callSetRefreshToken,
  callSetResetAuthentication,
};

export default actions;
