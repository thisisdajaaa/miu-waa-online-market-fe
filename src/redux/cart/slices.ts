import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BuyerDetailResponse } from "@/types/server/user";

import { initialBuyer, initialCartState } from "./data";
import { CartProduct } from "./models";

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToBasket: (state, action: PayloadAction<CartProduct>) => {
      const product = action.payload;

      const existingProduct = state.products.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }

      state.total += +product.price;
    },
    removeFromBasket: (state, action: PayloadAction<number>) => {
      const lineItem = action.payload;

      const existingProduct = state.products.find(
        (item) => item.lineItem === lineItem
      );

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.products = state.products.filter(
            (item) => item.lineItem !== lineItem
          );
        }

        state.total -= +existingProduct.price;
      } else {
        console.warn(
          `Can't remove product (id: ${lineItem}) as it is not in the basket`
        );
      }
    },
    setBuyerDetails: (state, action: PayloadAction<BuyerDetailResponse>) => {
      state.buyerDetails = action.payload;
    },
    setResetCart: (state) => {
      state.products = [];
      state.total = 0;
    },
    setResetBuyerDetails: (state) => {
      state.buyerDetails = initialBuyer;
    },
  },
});

const { actions: cartActions, reducer: cartReducer } = cartSlice;

export { cartActions, cartReducer };
