import { ElementType, ComponentPropsWithRef } from "react";
import clsx from "clsx";

interface PaperProps<C extends ElementType> {
  component?: C;
}

export const Paper = <C extends ElementType = "div">({
  component,
  className,
  ...props
}: PaperProps<C> & Omit<ComponentPropsWithRef<C>, keyof PaperProps<C>>) => {
  const Component = component || "div";
  return (
    <Component
      className={clsx(
        "bg-white dark:bg-slate-800 shadow-2xl dark:shadow-gray-800 rounded-2xl overflow-hidden",
        className
      )}
      {...props}
    />
  );
};
