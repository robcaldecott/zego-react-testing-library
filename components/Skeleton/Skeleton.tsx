import { ComponentPropsWithoutRef } from "react";

interface SkeletonProps extends ComponentPropsWithoutRef<"span"> {
  height?: number | string;
}

export const Skeleton = ({ height, style, ...props }: SkeletonProps) => (
  <span
    // eslint-disable-next-line no-octal-escape
    className="bg-gray-200 dark:bg-gray-700 rounded before:content-['\00a0'] block h-auto animate-pulse scale-y-75"
    style={{ height, ...style }}
    {...props}
  />
);
