import { initialAuthenticationState } from "./data";
import { RootState } from "../store";

const userDetails = (state: RootState) =>
  state.authentication.userDetails || initialAuthenticationState.userDetails;

const selectors = { userDetails };

export default selectors;
