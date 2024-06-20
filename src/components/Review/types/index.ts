export type ReviewProps = {
  onDelete?: (id: number) => void;
} & IReview;

export interface IReview {
  id: number;
  product: string;
  comment: string;
  rating: number;
  date: string;
  buyer: string;
  content: string;
  isFlagged: boolean;
}
