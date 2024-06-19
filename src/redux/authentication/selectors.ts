import { initialAuthenticationState } from "./data";
import { RootState } from "../store";

const accessToken = (state: RootState) =>
  state.authentication.accessToken || initialAuthenticationState.accessToken;

const refreshToken = (state: RootState) =>
  state.authentication.refreshToken || initialAuthenticationState.refreshToken;

const selectors = { accessToken, refreshToken };

export default selectors;
