import { initialCartState } from "./data";
import { RootState } from "../store";

const products = (state: RootState) =>
  state.cart.products || initialCartState.products;

const total = (state: RootState) => state.cart.total || initialCartState.total;

const buyerDetails = (state: RootState) =>
  state.cart.buyerDetails || initialCartState.buyerDetails;

const selectors = { products, total, buyerDetails };

export default selectors;
