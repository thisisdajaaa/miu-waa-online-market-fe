import type { ComponentPropsWithRef } from "react";

import { ButtonShape, ButtonSize, ButtonVariant } from "../config";

export type ButtonProps = {
  isLoading?: boolean;
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof ButtonSize;
  shape?: keyof typeof ButtonShape;
} & ComponentPropsWithRef<"button">;
