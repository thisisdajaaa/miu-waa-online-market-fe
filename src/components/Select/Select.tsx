import { FC, FocusEvent, useRef } from "react";

import clsxm from "@/utils/clsxmUtil";

import type { SelectProps } from "./types";

const Select: FC<SelectProps> = (props) => {
  const {
    options,
    hasError = false,
    isReadOnly,
    onFocus,
    label,
    className,
    isRequired,
    value,
    ...rest
  } = props;

  const selectRef = useRef<HTMLSelectElement>(null);

  const handleFocus = (event: FocusEvent<HTMLSelectElement, Element>) => {
    if (isReadOnly) selectRef.current?.blur();
    if (onFocus) onFocus(event);
  };

  return (
    <>
      <label className="form-control w-full">
        {label && (
          <div className="label">
            <span className="label-text font-bold">
              {label} {isRequired && <span className="text-accent">*</span>}
            </span>
          </div>
        )}

        <select
          ref={selectRef}
          value={!value ? "" : value}
          className={clsxm(
            className,
            "select select-bordered w-full bg-white text-blackOut",
            !value ? "select-placeholder" : "text-black",
            hasError && "select-error"
          )}
          onFocus={handleFocus}
          {...rest}
        >
          <option disabled value="">
            Pick one
          </option>

          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

export default Select;
