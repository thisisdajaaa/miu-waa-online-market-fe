import type { FileWithPreview } from "@/components/ImageUpload/types";

export type ProductForm = {
  filters: ProductFormFilters;
  details: ProductFormDetails;
  mode: "add" | "edit";
};

export type ProductFormFilters = {
  name: string;
  price: number;
  category: string;
  rating: number;
};

export type ProductFormDetails = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: FileWithPreview | null;
  description: string;
};
