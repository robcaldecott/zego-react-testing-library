import { ComponentPropsWithoutRef, ElementType } from "react";
import clsx from "clsx";

export interface IconButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  icon: ElementType;
  color?: "primary" | "inherit";
  edge?: "start" | "end";
}

export const IconButton = ({
  icon: Icon,
  color = "primary",
  edge,
  ...props
}: IconButtonProps) => (
  <button
    className={clsx(
      "flex items-center justify-center p-3 rounded-2xl hover:bg-black/5",
      edge === "end" && "-mr-3",
      edge === "start" && "-ml-3"
    )}
    {...props}
  >
    <Icon
      className={clsx(
        "h-5 w-5",
        color === "primary" && "text-sky-500",
        color === "inherit" && "text-inherit"
      )}
      aria-hidden="true"
    />
  </button>
);
