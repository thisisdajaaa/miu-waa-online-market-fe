import { InputHTMLAttributes, ReactNode } from "react";

export type InputProps = {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  hasError?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  inputClassname?: string;
  containerClassname?: string;
} & InputHTMLAttributes<HTMLInputElement>;
