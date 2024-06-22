import type { ReviewDetailResponse } from "./review";

export type ProductDetailResponse = {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  sellerId: number;
  category: string;
  base64Image: string;
  rating: number;
  reviews: ReviewDetailResponse[];
  inStock: boolean;
  isDeletable: boolean;
  sellerName: string;
};
