export type ReviewDetailResponse = {
  id: number;
  content: string;
  rating: number;
  isFlagged: boolean;
  createdDate?: string;
  buyer: string;
  product: string;
};
