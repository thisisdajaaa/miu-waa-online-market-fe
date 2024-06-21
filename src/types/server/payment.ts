export type PaymentDetailRequest = {
  paymentMethod: string;
  amount: number;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

export type PaymentDetailResponse = {
  id: number;
  paymentMethod: string;
  amount: number;
  paymentDate: string;
};
