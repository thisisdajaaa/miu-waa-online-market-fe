import { ProductDetailResponse } from "./product";

export type LineItemDetailResponse = {
  id: number;
  quantity: number;
  product: ProductDetailResponse;
  orderDate: string;
};

export type LineItemDetailRequest = {
  productId: number;
  shoppingCartId: number;
  quantity: number;
};
