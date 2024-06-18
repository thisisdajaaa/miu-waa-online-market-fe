export type ImageUploadProps = {
  label?: string;
  isRequired?: boolean;
  value: File | string;
  onChange: (value: File | FileWithPreview[] | null) => void;
  containerClassname?: string;
};

export type FileWithPreview = {
  preview: string;
} & File;
