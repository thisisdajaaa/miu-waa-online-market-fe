import { useField } from "formik";
import { FC, useCallback, useState } from "react";

import { useUpdateEffect } from "@/hooks";

import ImageUpload from "@/components/ImageUpload";
import type { FileWithPreview } from "@/components/ImageUpload/types";

import type { FormImageUploadProps } from "./types";
import ValidationMessage from "../ValidationMessage";

const FormImageUpload: FC<FormImageUploadProps> = (props) => {
  const { name, handleImageUpload, ...rest } = props;

  const [, meta, helpers] = useField(name);

  const [currentValue, setCurrentValue] = useState<
    File | FileWithPreview[] | null
  >(meta.value || meta.initialValue);

  useUpdateEffect(() => {
    setCurrentValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (fileName: File | FileWithPreview[] | null) => {
      setCurrentValue(fileName);
      helpers.setValue(fileName);
      helpers.setTouched(true);
      helpers.setError("");

      if (handleImageUpload) handleImageUpload(fileName);
    },
    [helpers, handleImageUpload]
  );

  return (
    <div className="flex flex-col">
      <ImageUpload
        {...rest}
        value={currentValue as File}
        onChange={handleChange}
      />

      <ValidationMessage name={name} />
    </div>
  );
};

export default FormImageUpload;
