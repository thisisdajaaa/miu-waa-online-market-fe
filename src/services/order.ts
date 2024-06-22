import { onParseResponse } from "@/utils/axiosUtil";

import type {
  AddressDetailRequest,
  AddressDetailResponse,
} from "@/types/server/address";
import type {
  OrderDetailRequest,
  OrderDetailResponse,
  OrderRequest,
  OrderStatus,
  OrderStatusRequest,
} from "@/types/server/order";
import type {
  PaymentDetailRequest,
  PaymentDetailResponse,
} from "@/types/server/payment";

export const addAddressAPI = async (
  buyerId: number,
  payload: AddressDetailRequest
): Promise<AddressDetailResponse> => {
  const response = await onParseResponse<AddressDetailResponse>({
    method: "post",
    url: `/buyers/${buyerId}/Adding/addresses`,
    data: payload,
  });

  return response;
};

export const createPaymentAPI = async (
  buyerId: number,
  orderId: number,
  payload: PaymentDetailRequest
): Promise<PaymentDetailResponse> => {
  const response = await onParseResponse<PaymentDetailResponse>({
    method: "post",
    url: `/buyers/${buyerId}/orders/${orderId}/payments`,
    data: payload,
  });

  return response;
};

export const placeOrderAPI = async (
  buyerId: number,
  payload: OrderDetailRequest
): Promise<OrderDetailResponse> => {
  const response = await onParseResponse<OrderDetailResponse>({
    method: "post",
    url: `/buyers/${buyerId}/makeorder`,
    data: payload,
  });

  return response;
};

export const createOrderAPI = async (
  payload: OrderDetailRequest
): Promise<OrderDetailResponse> => {
  const response = await onParseResponse<OrderDetailResponse>({
    method: "post",
    url: `/orders/create`,
    data: payload,
  });

  return response;
};

export const getBuyerOrdersAPI = async (
  buyerId: number
): Promise<OrderRequest[]> => {
  const response = await onParseResponse<OrderRequest[]>({
    method: "get",
    url: `/orders/buyer/${buyerId}`,
  });

  return response;
};

export const getSellerOrdersAPI = async (
  sellerId: number
): Promise<OrderRequest[]> => {
  const response = await onParseResponse<OrderRequest[]>({
    method: "get",
    url: `/orders/seller/${sellerId}`,
  });

  return response;
};

export const updateOrderStatusAPI = async (
  orderId: number,
  status: OrderStatus
): Promise<OrderDetailResponse> => {
  const payload: OrderStatusRequest = {
    orderStatus: status,
  };

  const response = await onParseResponse<OrderDetailResponse>({
    method: "put",
    url: `/orders/myorderstatus/${orderId}`,
    data: payload,
  });

  return response;
};

export const getOrderDetailsAPI = async (
  orderId: number
): Promise<OrderDetailResponse> => {
  const response = await onParseResponse<OrderDetailResponse>({
    method: "get",
    url: `/orders/${orderId}`,
  });

  return response;
};

export const cancelOrderAPI = async (orderId: number): Promise<void> => {
  const response = await onParseResponse<void>({
    method: "delete",
    url: `/orders/${orderId}`,
  });
  return response;
};
