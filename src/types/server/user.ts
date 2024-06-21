import { AddressDetailResponse } from "./address";
import { OrderDetailResponse } from "./order";
import { ReviewDetailResponse } from "./review";
import { ShoppingCartDetailResponse } from "./shoppingCart";

export type UserDetailResponse = {
  id: number;
  name: string;
  role: string;
  email: string;
};

export type BuyerDetailResponse = {
  id: number;
  name: string;
  email: string;
  addresses: AddressDetailResponse[];
  orders: OrderDetailResponse[];
  reviews: ReviewDetailResponse[];
  shoppingCart: ShoppingCartDetailResponse;
};
