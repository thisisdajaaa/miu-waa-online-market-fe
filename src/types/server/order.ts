import { AddressDetailResponse } from "./address";

export type OrderStatus =
  | "CANCELED"
  | "PLACED"
  | "SHIPPED"
  | "ON_THE_WAY"
  | "DELIVERED";

export type OrderDetailResponse = {
  id: number;
  totalAmount: number;
  billingAddress: AddressDetailResponse;
  shippingAddress: AddressDetailResponse;
};

export type OrderDetailRequest = {
  buyerId: number;
  sellerId: number;
  status: OrderStatus;
  totalAmount: number;
  orderDate: Date;
  shippingAddress: AddressDetailResponse;
  billingAddress: AddressDetailResponse;
};
