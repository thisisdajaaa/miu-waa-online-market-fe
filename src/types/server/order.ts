import { AddressDetailResponse } from "./address";
import { ProductDetailResponse } from "./product";

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

export type OrderRequest = {
  id: number;
  totalAmount: number;
  orderDate: Date;
  status: string;
  shippingAddress: AddressDetailResponse;
  billingAddress: AddressDetailResponse;
  orderItems: OrderItemDetailResponse[];
};

export type OrdersResponse = OrderRequest[];

export type OrderItemDetailResponse = {
  id: number;
  quantity: number;
  product: ProductDetailResponse;
};
