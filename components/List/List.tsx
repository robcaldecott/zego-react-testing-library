import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";
import clsx from "clsx";
import { Text } from "../Text";

interface ListProps extends ComponentPropsWithoutRef<"ul"> {
  dividers?: boolean;
  padding?: boolean;
}

export const List = ({ dividers, padding, className, ...props }: ListProps) => (
  <ul
    className={clsx(
      padding && "py-2",
      dividers && "divide-y divide-slate-300 dark:divide-slate-500",
      className
    )}
    {...props}
  />
);

interface ListItemProps<C extends ElementType> {
  component?: C;
  button?: boolean;
}

export const ListItem = <C extends ElementType = "li">({
  component,
  button,
  className,
  divider,
  ...props
}: ListItemProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof ListItemProps<C>>) => {
  const Component = component || "li";
  return (
    <Component
      className={clsx(
        "py-2 px-4 w-full flex justify-start items-center space-x-2 focus:bg-slate-200 dark:focus:bg-slate-700 outline-none",
        button && "hover:bg-slate-100/75 dark:hover:bg-slate-700/75 text-left",
        className
      )}
      {...props}
    />
  );
};

interface ListItemLinkProps extends ComponentPropsWithoutRef<"a"> {}

export const ListItemLink = forwardRef<HTMLAnchorElement, ListItemLinkProps>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={clsx(
        "py-2 px-4 w-full flex justify-start items-center space-x-2 focus:bg-slate-200 dark:focus:bg-slate-700 outline-none hover:bg-slate-100/75 dark:hover:bg-slate-700/75 text-left",
        className
      )}
      {...props}
    />
  )
);
ListItemLink.displayName = "ListItemLink";

interface ListItemTextProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  primary: ReactNode;
  secondary: ReactNode;
}

export const ListItemText = ({
  className,
  primary,
  secondary,
  ...props
}: ListItemTextProps) => (
  <div className={clsx("my-[6px] flex-auto min-w-0", className)} {...props}>
    <Text component="span" variant="body1" block noWrap>
      {primary}
    </Text>
    <Text component="p" variant="body2" color="secondary" block noWrap>
      {secondary}
    </Text>
  </div>
);
