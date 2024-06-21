export type OrderCardProps = {
  onViewDetails: () => void;
} & OrderCard;

export interface OrderCard {
  orderNumber: string;
  deliveryDate: string;
  soldBy: string;
  productImages: string[];
  showOrderStatusSelect?: boolean;
  orderStatus: string;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  quantity: number;
  name: string;
  price: number;
  image: string;
}
