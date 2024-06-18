import type {
  FileWithPreview,
  ImageUploadProps,
} from "@/components/ImageUpload/types";

export type FormImageUploadProps = {
  name: string;
  handleImageUpload?: (value: File | FileWithPreview[] | null) => void;
} & Omit<ImageUploadProps, "value" | "onChange">;
