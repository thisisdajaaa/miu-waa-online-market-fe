import type { ShoppingCartDetailResponse } from "@/types/server/shoppingCart";
import type { BuyerDetailResponse } from "@/types/server/user";

import type { CartState } from "./models";

export const initialShoppingCart: ShoppingCartDetailResponse = {
  id: 0,
  lineItems: [],
};

export const initialBuyer: BuyerDetailResponse = {
  id: 0,
  email: "",
  name: "",
  addresses: [],
  orders: [],
  reviews: [],
  shoppingCart: initialShoppingCart,
};

export const initialCartState: CartState = {
  products: [],
  total: 0,
  buyerDetails: initialBuyer,
};
