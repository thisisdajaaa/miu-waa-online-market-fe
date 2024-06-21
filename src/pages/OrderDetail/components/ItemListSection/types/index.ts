import { OrderItem } from "@/components/OrderCard/types";

import type { OrderStatus } from "@/types/server/order";

export type ItemListSectionProps = {
  status: OrderStatus;
  orderDetails: OrderItem[];
  showReviewModal: () => void;
};
