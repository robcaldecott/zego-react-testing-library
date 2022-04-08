import type { ReactNode } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { Text } from "../Text";

interface AlertProps {
  label: ReactNode;
  action?: ReactNode;
  grow?: boolean;
}

export const Alert = ({ label, action, grow }: AlertProps) => (
  <div
    className={clsx(
      "flex space-x-2 items-center px-4 py-2 bg-red-100 dark:bg-red-800 min-w-0 rounded-md",
      action ? "pr-1" : "pr-4",
      grow && "grow"
    )}
  >
    <ExclamationCircleIcon
      aria-hidden="true"
      className="h-5 w-5 text-red-500 shrink-0"
    />

    <Text variant="body1" flexGrow={1} minWidth={0} noWrap>
      {label}
    </Text>

    {action && <div className="shrink-0">{action}</div>}
  </div>
);
