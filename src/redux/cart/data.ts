import type { CartState } from "./models";

export const initialCartState: CartState = {
  products: [],
  total: 0,
  buyerDetails: {
    id: 0,
    email: "",
    name: "",
    addresses: [],
    orders: [],
    reviews: [],
    shoppingCart: {
      id: 0,
      lineItems: [],
    },
  },
};
