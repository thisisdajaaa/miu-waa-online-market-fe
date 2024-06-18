import { SelectHTMLAttributes } from "react";

import type { Option } from "@/types/client";

export type SelectProps = {
  label?: string;
  hasError?: boolean;
  options: Option[];
  isReadOnly?: boolean;
  isRequired?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;
