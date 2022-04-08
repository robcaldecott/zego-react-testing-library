import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { Paper } from "../Paper";
import { Text } from "../Text";

interface ErrorMessageProps {
  error: Response | null;
  action?: ReactNode | undefined;
}

export const ErrorMessage = ({ error, action }: ErrorMessageProps) => (
  <Paper className="p-8 flex flex-col items-center space-y-2 max-w-2xl mx-auto">
    <ExclamationCircleIcon
      aria-hidden="true"
      className="text-red-500 h-16 w-16"
    />

    <Text variant="h2" component="h2" align="center">
      <FormattedMessage
        id="errorTitle"
        defaultMessage="Something went wrong!"
      />
    </Text>

    {error && (
      <Text variant="body1" align="center" color="secondary">
        {`${error.status}: ${error.statusText}`}
      </Text>
    )}

    {action}
  </Paper>
);
