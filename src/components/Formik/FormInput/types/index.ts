import type { InputProps } from "@/components/Input/types";

export type FormInputProps = {
  name: string;
  handleInputChange?: (value: string) => void;
} & InputProps;
