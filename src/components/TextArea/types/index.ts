import { TextareaHTMLAttributes } from "react";

export type TextAreaProps = {
  label?: string;
  hasError?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  textAreaClassname?: string;
  containerClassname?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;
