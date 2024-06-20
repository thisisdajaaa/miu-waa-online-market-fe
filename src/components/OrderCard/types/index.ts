export type OrderCardProps = {
  id: number
  orderNumber: string;
  deliveryDate: string;
  soldBy: string;
  onViewDetails: () => void;
  productImages: string[];
  showOrderStatusSelect?: boolean;
};
