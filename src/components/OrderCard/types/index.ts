export type OrderCardProps = {
  onViewDetails: () => void;
} & OrderCard;

export interface OrderCard {
  id: number;
  orderNumber: string;
  deliveryDate: string;
  soldBy?: string;
  productImages: string[];
  showOrderStatusSelect?: boolean;
  orderStatus: string;
  orderItems?: OrderItem[];
  shippingAddress?: string;
  handleLoad: () => void;
}

export interface OrderItem {
  quantity: number;
  name: string;
  price: number;
  image: string;
}
