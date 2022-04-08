import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { ErrorMessage } from ".";

describe("ErrorMessage", () => {
  it("renders without an action", () => {
    render(
      <IntlProvider locale="en">
        <ErrorMessage
          error={{ status: 500, statusText: "An error occurred" } as Response}
        />
      </IntlProvider>
    );
    expect(
      screen.getByRole("heading", { name: /something went wrong!/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/500: an error occurred/i)).toBeInTheDocument();
  });

  it("renders with an action", () => {
    render(
      <IntlProvider locale="en">
        <ErrorMessage
          error={{ status: 500, statusText: "An error occurred" } as Response}
          action={<button>Action</button>}
        />
      </IntlProvider>
    );
    userEvent.click(screen.getByRole("button", { name: /action/i }));
  });
});
