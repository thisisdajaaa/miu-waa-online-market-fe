import { ErrorMessage } from "formik";
import { FC } from "react";

import useFieldError from "@/hooks/useFieldError";

import type { ValidationMessageProps } from "./types";

const ValidationMessage: FC<ValidationMessageProps> = (props) => {
  const { name } = props;

  const hasError = useFieldError(name);

  const renderMessage = (message: string | { [key: string]: string }) =>
    typeof message === "string"
      ? message
      : (Object.values(message)[0] as string);

  if (!hasError) return null;

  return (
    <ErrorMessage name={name}>
      {(message) => (
        <span className="text-sm leading-[0.813rem] text-red-500 mt-[0.625rem] font-normal">
          {renderMessage(message)}
        </span>
      )}
    </ErrorMessage>
  );
};
export default ValidationMessage;
