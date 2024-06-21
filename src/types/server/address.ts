export type AddressDetailResponse = {
  id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type AddressDetailRequest = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};
