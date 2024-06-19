import type { IProduct } from "@/components/ProductCard/types";

import { cartActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { addToBasket, removeFromBasket } = cartActions;

const callAddToBasket =
  (product: IProduct): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(addToBasket(product));
  };

const callRemoveToBasket =
  (id: number): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(removeFromBasket(id));
  };

const actions = {
  callAddToBasket,
  callRemoveToBasket,
};

export default actions;
