import type { IProduct } from "@/components/ProductCard/types";

export type CartProduct = { quantity: number } & IProduct;

export type CartState = {
  products: CartProduct[];
  total: number;
};
