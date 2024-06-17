import { FC, FocusEvent, useRef, WheelEvent } from "react";

import clsxm from "@/utils/clsxmUtil";

import type { InputProps } from "./types";

const Input: FC<InputProps> = (props) => {
  const {
    hasError,
    inputClassname,
    containerClassname,
    type,
    value,
    onFocus,
    label,
    leftIcon,
    rightIcon,
    disabled = false,
    isRequired,
    isReadOnly,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = (event: FocusEvent<HTMLInputElement, Element>) => {
    if (isReadOnly) inputRef.current?.blur();
    if (onFocus) onFocus(event);
  };

  const handleWheel = (event: WheelEvent<HTMLInputElement>) => {
    if (type === "number") event.currentTarget.blur();
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

      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {leftIcon}
          </div>
        )}

        <input
          ref={inputRef}
          type={type}
          value={value}
          disabled={disabled || isReadOnly}
          onFocus={handleFocus}
          readOnly={isReadOnly}
          onWheel={handleWheel}
          className={clsxm(
            "input input-bordered w-full bg-white text-blackOut",
            hasError && "input-error",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            inputClassname
          )}
          {...rest}
        />

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
