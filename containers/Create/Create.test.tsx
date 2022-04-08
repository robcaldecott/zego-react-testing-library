import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { PathParams, rest } from "msw";
import { IntlProvider } from "react-intl";
import { QueryClient, QueryClientProvider } from "react-query";
import type { Vehicle } from "@/types";
import { Create } from "./Create";

describe("Create", () => {
  const server = setupServer(
    rest.post<Vehicle, PathParams, Vehicle>("/api/vehicles", (req, res, ctx) =>
      res(ctx.json({ ...req.body }))
    )
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  const queryClient = new QueryClient();

  const Wrapper = () => (
    <IntlProvider locale="en">
      <QueryClientProvider client={queryClient}>
        <Create />
      </QueryClientProvider>
    </IntlProvider>
  );

  it("submits", async () => {
    render(<Wrapper />);
    // Check for the "Home" link
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    // Title
    expect(
      screen.getByRole("heading", { name: /create new vehicle/i })
    ).toBeInTheDocument();
    // Complete the form
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /make/i }),
      ["Audi"]
    );
    await userEvent.type(screen.getByRole("textbox", { name: /model/i }), "A4");
    await userEvent.type(
      screen.getByRole("textbox", { name: /variant/i }),
      "Saloon"
    );
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /fuel/i }),
      ["Gasoline"]
    );
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /colour/i }),
      ["Black"]
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /registration number/i }),
      "ABC 123"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /vin/i }),
      "ABCDEF1234567890"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /mileage/i }),
      "12345"
    );
    await userEvent.type(
      screen.getByLabelText(/registration date/i),
      "1999-12-31"
    );
    // Submit the form
    await userEvent.click(screen.getByRole("button", { name: /create/i }));
    // Check the buttons are disabled
    expect(screen.getByRole("button", { name: /create/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /reset/i })).toBeDisabled();
    // Check all the fields are disabled
    expect(screen.getByRole("combobox", { name: /make/i })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: /model/i })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: /variant/i })).toBeDisabled();
    expect(screen.getByRole("combobox", { name: /fuel/i })).toBeDisabled();
    expect(screen.getByRole("combobox", { name: /colour/i })).toBeDisabled();
    expect(
      screen.getByRole("textbox", { name: /registration number/i })
    ).toBeDisabled();
    expect(screen.getByRole("textbox", { name: /vin/i })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: /mileage/i })).toBeDisabled();
    expect(screen.getByLabelText(/registration date/i)).toBeDisabled();
  });

  it("resets the form", async () => {
    render(<Wrapper />);
    // Complete the form
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /make/i }),
      ["Audi"]
    );
    await userEvent.type(screen.getByRole("textbox", { name: /model/i }), "A4");
    await userEvent.type(
      screen.getByRole("textbox", { name: /variant/i }),
      "Saloon"
    );
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /fuel/i }),
      ["Gasoline"]
    );
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /colour/i }),
      ["Black"]
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /registration number/i }),
      "ABC 123"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /vin/i }),
      "ABCDEF1234567890"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /mileage/i }),
      "12345"
    );
    await userEvent.type(
      screen.getByLabelText(/registration date/i),
      "31121999"
    );
    // Reset the form
    await userEvent.click(screen.getByRole("button", { name: /reset/i }));
    // Check all the fields are empty
    expect(screen.getByRole("combobox", { name: /make/i })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: /model/i })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: /variant/i })).toHaveValue("");
    expect(screen.getByRole("combobox", { name: /fuel/i })).toHaveValue("");
    expect(screen.getByRole("combobox", { name: /colour/i })).toHaveValue("");
    expect(
      screen.getByRole("textbox", { name: /registration number/i })
    ).toHaveValue("");
    expect(screen.getByRole("textbox", { name: /vin/i })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: /mileage/i })).toHaveValue("");
    expect(screen.getByLabelText(/registration date/i)).toHaveValue("");
  });

  it("validates the form", async () => {
    render(<Wrapper />);
    // Submit the form
    await userEvent.click(screen.getByRole("button", { name: /create/i }));
    // Check all the fields are empty
    expect(
      await screen.findByText(/please select a make/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/please enter the model/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter the variant/i)).toBeInTheDocument();
    expect(screen.getByText(/please select a fuel type/i)).toBeInTheDocument();
    expect(screen.getByText(/please select a colour/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please enter the registration number/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/please enter the vin/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter the mileage/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please enter the registration date/i)
    ).toBeInTheDocument();
  });
});
