import { ReviewDetailResponse } from "@/types/server/review";

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
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  rating: number;
  quantity: number;
  reviews?: ReviewDetailResponse[];
}
