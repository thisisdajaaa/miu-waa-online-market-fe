import { useField } from "formik";
import { ChangeEvent, FC, useCallback, useState } from "react";

import { useFieldError, useUpdateEffect } from "@/hooks";

import Select from "@/components/Select";

import type { FormSelectProps } from "./types";
import ValidationMessage from "../ValidationMessage";

const FormSelect: FC<FormSelectProps> = (props) => {
  const { name, handleSelectChange, ...rest } = props;

  const [, meta, helpers] = useField(name);

  const [currentValue, setCurrentValue] = useState<string>(
    meta.value || meta.initialValue
  );

  const hasError = useFieldError(name);

  useUpdateEffect(() => {
    setCurrentValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const text = event.target.value;

      setCurrentValue(text);
      helpers.setValue(text);
      helpers.setError("");

      if (handleSelectChange) handleSelectChange(text);
    },
    [helpers, handleSelectChange]
  );

  const handleBlur = useCallback(() => {
    helpers.setTouched(true);
  }, [helpers]);

  return (
    <div className="flex flex-col">
      <Select
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

export default FormSelect;
