import { IProduct } from "@/components/ProductCard/types";

import { addLineItemAPI, removeLineItemAPI } from "@/services/shoppingCart";
import { getBuyerDetailsAPI } from "@/services/user";

import { cartActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const {
  addToBasket,
  removeFromBasket,
  setBuyerDetails,
  setResetCart,
  setResetBuyerDetails,
} = cartActions;

const callAddToBasket =
  (buyerId: number, shoppingCartId: number, product: IProduct): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      const payload = {
        productId: product.id,
        shoppingCartId,
        quantity: 1,
      };

      const response = await addLineItemAPI(buyerId, payload);
      dispatch(addToBasket({ lineItem: response.id, ...product }));
    } catch (error) {
      console.error("Failed to add item to basket:", error);
    }
  };

const callRemoveFromBasket =
  (buyerId: number, lineItemId: number): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      await removeLineItemAPI(buyerId, lineItemId);
      dispatch(removeFromBasket(lineItemId));
    } catch (error) {
      console.error("Failed to remove item from basket:", error);
    }
  };

const callSetBuyerDetails =
  (id: number): AppThunk =>
  async (dispatch: AppDispatch) => {
    const response = await getBuyerDetailsAPI(id);
    dispatch(setBuyerDetails(response));
  };

const callSetResetCart = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(setResetCart());
};

const callSetResetBuyerDetails = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(setResetBuyerDetails());
};

const actions = {
  callAddToBasket,
  callRemoveFromBasket,
  callSetBuyerDetails,
  callSetResetCart,
  callSetResetBuyerDetails,
};

export default actions;
