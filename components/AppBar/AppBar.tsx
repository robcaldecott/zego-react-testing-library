import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

interface AppBarProps extends ComponentPropsWithoutRef<"header"> {}

export const AppBar = ({ className, ...props }: AppBarProps) => (
  <header
    className={clsx(
      "bg-slate-600 text-white px-4 sm:px-6 shadow-lg h-12 min-h-full flex items-center sticky top-0 z-10",
      className
    )}
    {...props}
  />
);
