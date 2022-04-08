import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "error";
}

export const Button = ({
  variant = "primary",
  disabled,
  className,
  ...props
}: ButtonProps) => (
  <button
    className={clsx(
      // Common styles
      "font-sans font-medium px-4 py-2 text-sm min-w-[72px] rounded-full border-2 outline-none transition-colors focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-300 dark:ring-offset-slate-900 disabled:text-slate-300 dark:disabled:text-slate-400 disabled:bg-slate-100 disabled:border-slate-100 dark:disabled:bg-slate-600 dark:disabled:border-slate-600",
      // Primary
      variant === "primary" &&
        "bg-sky-500 hover:bg-sky-700 text-white border-sky-500 hover:border-sky-700",
      // Secondary
      variant === "secondary" &&
        "bg-transparent text-slate-900 dark:text-slate-100 border-slate-900 dark:border-slate-100 hover:text-white dark:hover:text-slate-900 hover:bg-slate-900 dark:hover:bg-slate-100",
      // Error
      variant === "error" &&
        "bg-transparent text-red-500 dark:text-red-300 border-red-500 dark:border-red-500 hover:text-white dark:hover:text-white hover:bg-red-500 dark:hover:bg-red-500",
      // Additional classes
      className
    )}
    disabled={disabled}
    {...props}
  />
);
