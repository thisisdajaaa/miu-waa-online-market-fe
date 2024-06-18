export type ProductCardProps = {
  showBtnBasket?: boolean;
  onEdit?: (product: IProduct) => void;
  onDelete?: (id: number) => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
} & IProduct;

export interface IProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  imageUrl: string;
}
