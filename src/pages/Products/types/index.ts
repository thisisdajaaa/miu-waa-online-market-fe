import type { FileWithPreview } from "@/components/ImageUpload/types";

export type ProductForm = {
  filters: ProductFormFilters;
  details: ProducFormtDetails;
  mode: "add" | "edit";
};

export type ProductFormFilters = {
  name: string;
  price: number;
  category: string;
  rating: number;
};

export type ProducFormtDetails = {
  name: string;
  price: number;
  image: FileWithPreview | null;
  description: string;
};
