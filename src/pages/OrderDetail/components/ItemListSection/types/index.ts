import { LineItemDetailResponse } from "@/types/server/lineItem";
import type { OrderStatus } from "@/types/server/order";

export type ItemListSectionProps = {
  status: OrderStatus;
  orderDetails: LineItemDetailResponse[];
  showReviewModal: (id: number, name: string) => void;
  seller: string;
};
