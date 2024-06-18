import type { SelectProps } from "@/components/Select/types";

export type FormSelectProps = {
  name: string;
  handleSelectChange?: (value: string) => void;
} & SelectProps;
