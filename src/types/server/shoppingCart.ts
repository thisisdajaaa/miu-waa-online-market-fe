import { LineItemDetailResponse } from "./lineItem";

export type ShoppingCartDetailResponse = {
  id: number;
  lineItems: LineItemDetailResponse[];
};
