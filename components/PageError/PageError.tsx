import { FormattedMessage } from "react-intl";
import { ErrorMessage } from "../ErrorMessage";
import { Button } from "../Button";

interface PageErrorProps {
  error: Response | null;
  refetch: () => void;
}

export const PageError = ({ error, refetch }: PageErrorProps) => (
  <ErrorMessage
    error={error}
    action={
      <Button onClick={() => refetch()}>
        <FormattedMessage id="tryAgain" defaultMessage="Try again" />
      </Button>
    }
  />
);
