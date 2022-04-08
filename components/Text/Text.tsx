import { ComponentPropsWithoutRef, ElementType } from "react";
import clsx from "clsx";

interface Props<C extends ElementType> {
  component?: C;
  variant?: "body1" | "body2" | "h1" | "h2" | "h3";
  color?: "primary" | "secondary" | "inherit";
  flexGrow?: 1 | 0;
  minWidth?: 0 | "full";
  noWrap?: boolean;
  align?: "left" | "center" | "right" | "justify";
  block?: boolean;
}

type TextProps<C extends ElementType> = Props<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof Props<C>>;

export const Text = <C extends ElementType = "div">({
  children,
  variant = "body1",
  color = "primary",
  flexGrow,
  minWidth,
  noWrap,
  align,
  block,
  component,
  className,
  ...props
}: TextProps<C>) => {
  const Component = component || "div";
  return (
    <Component
      className={clsx(
        `font-sans`,
        // Colour
        color === "primary" && "text-slate-900 dark:text-white",
        color === "secondary" && "text-slate-500 dark:text-slate-300",
        color === "inherit" && "text-inherit",
        // Variants
        variant === "body1" && "font-normal text-base",
        variant === "body2" && "font-normal text-sm",
        variant === "h1" && "font-normal text-3xl",
        variant === "h2" && "font-normal text-2xl",
        variant === "h3" && "font-medium text-xl",
        // Flex grow
        flexGrow === 0 && "flex-grow-0",
        flexGrow === 1 && "flex-grow",
        // Min width
        minWidth === 0 && "min-w-0",
        minWidth === "full" && "min-w-full",
        // Wrapping
        noWrap && "truncate",
        // Alignment
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        align === "justify" && "text-justify",
        // Display
        block && "block",
        // Additional styles
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
