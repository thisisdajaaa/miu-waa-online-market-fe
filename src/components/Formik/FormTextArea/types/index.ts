import type { TextAreaProps } from "@/components/TextArea/types";

export type FormTextAReaProps = {
  name: string;
  handleTextAreaChange?: (value: string) => void;
} & TextAreaProps;
