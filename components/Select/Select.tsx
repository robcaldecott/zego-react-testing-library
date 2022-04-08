import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { TextFieldLabel, TextFieldError, TextFieldInput } from "../TextField";

export interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  label?: ReactNode;
  error?: ReactNode;
  isRequired?: boolean;
}

export const Select = ({
  className,
  disabled,
  isRequired,
  label,
  error,
  ...props
}: SelectProps) => (
  <label className={clsx("block", className)}>
    {/* Label */}
    <TextFieldLabel disabled={disabled} isRequired={isRequired}>
      {label}
    </TextFieldLabel>

    {/* Select */}
    <span className="block relative">
      <TextFieldInput
        component="select"
        className="appearance-none"
        disabled={disabled}
        {...props}
      />

      {/* Icon */}
      <ChevronDownIcon
        aria-hidden="true"
        className={clsx(
          "h-6 w-6 absolute right-2 inset-y-2 pointer-events-none",
          disabled ? "text-slate-300" : "text-slate-500"
        )}
      />
    </span>

    {/* Error */}
    {error && <TextFieldError>{error}</TextFieldError>}
  </label>
);
