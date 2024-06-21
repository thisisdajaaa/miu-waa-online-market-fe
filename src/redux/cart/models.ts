import type { IProduct } from "@/components/ProductCard/types";

import { BuyerDetailResponse } from "@/types/server/user";

export type CartProduct = { quantity: number; lineItem: number } & IProduct;

export type CartState = {
  products: CartProduct[];
  total: number;
  buyerDetails: BuyerDetailResponse;
};
