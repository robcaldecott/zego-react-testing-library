import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import clsx from "clsx";

export interface TextFieldLabelProps extends ComponentPropsWithoutRef<"span"> {
  disabled?: boolean;
  isRequired?: boolean;
}

export const TextFieldLabel = ({
  disabled,
  isRequired,
  ...props
}: TextFieldLabelProps) => (
  <span
    className={clsx(
      "block font-sans text-sm font-medium mb-1",
      disabled
        ? "text-slate-400 dark:text-slate-600"
        : "text-slate-900 dark:text-slate-300",
      isRequired && "after:content-['*'] after:ml-0.5",
      isRequired && {
        "after:text-sky-500 dark:after:text-sky-300": !disabled,
        "after:text-slate-400": disabled,
      }
    )}
    {...props}
  />
);

export interface TextFieldErrorProps extends ComponentPropsWithoutRef<"span"> {}

export const TextFieldError = (props: TextFieldErrorProps) => (
  <span
    className="mt-2 font-sans text-sm font-light text-red-500 dark:text-red-300"
    {...props}
  />
);

interface TextFieldInputProps<C extends ElementType> {
  component?: C;
  rounded?: boolean;
  hasIcon?: boolean;
}

export const TextFieldInput = <C extends ElementType = "input">({
  component,
  className,
  rounded,
  hasIcon,
  ...props
}: TextFieldInputProps<C> & ComponentPropsWithoutRef<C>) => {
  const Component = component || "input";
  return (
    <Component
      className={clsx(
        "font-sans text-sm block w-full min-h-[40px] py-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 hover:border-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none placeholder-slate-400 placeholder-shown:italic disabled:bg-slate-50 disabled:text-slate-400 disabled:hover:border-slate-300 disabled:shadow-none transition-colors shadow-sm",
        rounded ? "rounded-2xl" : "rounded-md",
        hasIcon ? "pl-9 pr-2" : "px-2",
        className
      )}
      {...props}
    />
  );
};

export interface TextFieldProps extends ComponentPropsWithoutRef<"input"> {
  label?: ReactNode;
  error?: ReactNode;
  isRequired?: boolean;
}

export const TextField = ({
  className,
  label,
  disabled,
  isRequired,
  error,
  ...props
}: TextFieldProps) => (
  <label className={clsx("block", className)}>
    {/* Label */}
    <TextFieldLabel disabled={disabled} isRequired={isRequired}>
      {label}
    </TextFieldLabel>

    {/* Input */}
    <TextFieldInput disabled={disabled} {...props} />

    {/* Error */}
    {error && <TextFieldError>{error}</TextFieldError>}
  </label>
);
