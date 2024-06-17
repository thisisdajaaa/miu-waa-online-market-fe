import { FC, FocusEvent, useRef } from "react";

import clsxm from "@/utils/clsxmUtil";

import type { TextAreaProps } from "./types";

const TextArea: FC<TextAreaProps> = (props) => {
  const {
    hasError,
    textAreaClassname,
    containerClassname,
    value,
    onFocus,
    label,
    disabled = false,
    isRequired,
    isReadOnly,
    ...rest
  } = props;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleFocus = (event: FocusEvent<HTMLTextAreaElement, Element>) => {
    if (isReadOnly) textAreaRef.current?.blur();
    if (onFocus) onFocus(event);
  };

  return (
    <div className={clsxm("form-control w-full", containerClassname)}>
      {label && (
        <label className="label">
          <span className="label-text font-bold">
            {label} {isRequired && <span className="text-accent">*</span>}
          </span>
        </label>
      )}

      <textarea
        ref={textAreaRef}
        value={value}
        disabled={disabled || isReadOnly}
        onFocus={handleFocus}
        readOnly={isReadOnly}
        className={clsxm(
          "textarea textarea-bordered w-full bg-white text-blackOut",
          hasError && "textarea-error",
          textAreaClassname
        )}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
