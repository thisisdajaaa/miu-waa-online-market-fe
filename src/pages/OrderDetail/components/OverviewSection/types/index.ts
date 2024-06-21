import type { OrderDetailResponse, OrderStatus } from "@/types/server/order";

export type OverviewSectionProps = {
  status: OrderStatus;
  details: OrderDetailResponse;
};
