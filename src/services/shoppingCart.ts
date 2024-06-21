import { onParseResponse } from "@/utils/axiosUtil";

import {
  LineItemDetailRequest,
  LineItemDetailResponse,
} from "@/types/server/lineItem";
import { ShoppingCartDetailResponse } from "@/types/server/shoppingCart";

export const addLineItemAPI = async (
  id: number,
  payload: LineItemDetailRequest
): Promise<LineItemDetailResponse> => {
  const response = await onParseResponse<LineItemDetailResponse>({
    method: "post",
    url: `/buyers/${id}/shopping-cart/line-items`,
    data: payload,
  });

  return response;
};

export const removeLineItemAPI = async (
  id: number,
  lineItemId: number
): Promise<unknown> => {
  const response = await onParseResponse<unknown>({
    method: "delete",
    url: `/buyers/${id}/shopping-cart/line-items/${lineItemId}`,
  });

  return response;
};

export const getShoppingCartAPI = async (
  id: number
): Promise<ShoppingCartDetailResponse> => {
  const response = await onParseResponse<ShoppingCartDetailResponse>({
    method: "get",
    url: `/buyers/${id}/shopping-cart`,
  });

  return response;
};
