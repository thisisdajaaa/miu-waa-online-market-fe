import { useField } from "formik";
import { ChangeEvent, FC, useCallback, useState } from "react";

import { useFieldError, useUpdateEffect } from "@/hooks";

import TextArea from "@/components/TextArea";

import type { FormTextAReaProps } from "./types";
import ValidationMessage from "../ValidationMessage";

const FormTextArea: FC<FormTextAReaProps> = (props) => {
  const { name, handleTextAreaChange, maxLength, ...rest } = props;

  const [, meta, helpers] = useField(name);
  const hasError = useFieldError(name);

  const [currentValue, setCurrentValue] = useState<string | number>(
    meta.value || meta.initialValue
  );

  useUpdateEffect(() => {
    setCurrentValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const text = event.target.value;

      if (maxLength !== undefined && text.length > maxLength) return;

      setCurrentValue(text);
      helpers.setValue(text);
      helpers.setError("");

      if (handleTextAreaChange) {
        handleTextAreaChange(text);
      }
    },
    [helpers, handleTextAreaChange, maxLength]
  );

  const handleBlur = useCallback(() => {
    helpers.setTouched(true);
  }, [helpers]);

  return (
    <div className="flex flex-col">
      <TextArea
        {...rest}
        value={currentValue}
        hasError={hasError}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <ValidationMessage name={name} />
    </div>
  );
};

export default FormTextArea;
