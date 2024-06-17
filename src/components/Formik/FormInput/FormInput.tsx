import { useField } from "formik";
import { ChangeEvent, FC, useCallback, useState } from "react";

import { useFieldError, useUpdateEffect } from "@/hooks";

import Input from "@/components/Input";

import type { FormInputProps } from "./types";
import ValidationMessage from "../ValidationMessage";

const FormInput: FC<FormInputProps> = (props) => {
  const { name, handleInputChange, maxLength, ...rest } = props;

  const [, meta, helpers] = useField(name);
  const hasError = useFieldError(name);

  const [currentValue, setCurrentValue] = useState<string | number>(
    meta.value || meta.initialValue
  );

  useUpdateEffect(() => {
    setCurrentValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value;

      if (maxLength !== undefined && text.length > maxLength) return;

      setCurrentValue(text);
      helpers.setValue(text);
      helpers.setError("");

      if (handleInputChange) {
        handleInputChange(text);
      }
    },
    [helpers, handleInputChange, maxLength]
  );

  const handleBlur = useCallback(() => {
    helpers.setTouched(true);
  }, [helpers]);

  return (
    <div className="flex flex-col">
      <Input
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

export default FormInput;
