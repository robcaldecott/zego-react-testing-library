import { ElementType, forwardRef, ReactNode } from "react";
import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

interface FabProps extends Omit<ComponentPropsWithoutRef<"a">, "children"> {
  icon: ElementType;
  label?: ReactNode;
}

export const Fab = forwardRef<HTMLAnchorElement, FabProps>(
  ({ icon: Icon, label, className, ...props }, ref) => (
    <a
      ref={ref}
      className={clsx(
        "bg-sky-500 hover:bg-sky-700 text-white rounded-2xl inline-flex justify-center items-center shadow-lg",
        label ? "h-12 px-4 font-sans font-medium text-sm" : "w-14 h-14",
        className
      )}
      {...props}
    >
      <Icon className={clsx("h-6 w-6", label && "mr-2")} />
      {label}
    </a>
  )
);

Fab.displayName = "Fab";
