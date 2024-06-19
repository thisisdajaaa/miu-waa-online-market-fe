import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { IProduct } from "@/components/ProductCard/types";

import { initialCartState } from "./data";

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToBasket: (state, action: PayloadAction<IProduct>) => {
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
      const productId = action.payload;

      const existingProduct = state.products.find(
        (item) => item.id === productId
      );

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.products = state.products.filter(
            (item) => item.id !== productId
          );
        }

        state.total -= +existingProduct.price;
      } else {
        console.warn(
          `Can't remove product (id: ${productId}) as it is not in the basket`
        );
      }
    },
  },
});

const { actions: cartActions, reducer: cartReducer } = cartSlice;

export { cartActions, cartReducer };
