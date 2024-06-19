import { initialCartState } from "./data";
import { RootState } from "../store";

const products = (state: RootState) =>
  state.cart.products || initialCartState.products;

const total = (state: RootState) => state.cart.total || initialCartState.total;

const selectors = { products, total };

export default selectors;
