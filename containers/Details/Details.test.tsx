import {
  vi,
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
} from "vitest";
import { screen, render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { IntlProvider } from "react-intl";
import { QueryClient, QueryClientProvider } from "react-query";
import { Details } from "./Details";

const replace = vi.fn();

vi.mock("next/router", () => ({
  useRouter: () => ({ replace }),
}));

describe("Details", () => {
  const vehicle = {
    id: "5e0562c5-a50b-42ff-83e5-4c004c5b639a",
    manufacturer: "Volkswagen",
    model: "Explorer",
    type: "Cargo Van",
    fuel: "Gasoline",
    vin: "1USTAN9Z5MNT86399",
    color: "teal",
    mileage: 70609,
    registrationDate: "2005-07-08T16:58:36.380Z",
    registrationNumber: "TE52 HWW",
  };

  const server = setupServer();

  beforeAll(() => server.listen());
  beforeEach(() => {
    replace.mockReset();
  });
  afterEach(() => server.restoreHandlers());
  afterAll(() => server.close());

  const Wrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchIntervalInBackground: false,
          retry: 0,
        },
      },
    });

    return (
      <IntlProvider locale="en">
        <QueryClientProvider client={queryClient}>
          <Details id="123" />
        </QueryClientProvider>
      </IntlProvider>
    );
  };

  it("loads vehicle details", async () => {
    server.use(
      rest.get("/api/vehicles/:vehicleId", (req, res, ctx) =>
        res(ctx.json(vehicle))
      )
    );
    render(<Wrapper />);
    // Loading state
    expect(screen.getByLabelText(/loading vehicle/i)).toBeInTheDocument();
    // Wait for the details to load
    const card = within(await screen.findByLabelText(/vehicle details/i));
    // Check the headings
    expect(
      card.getByText(/volkswagen explorer cargo van/i)
    ).toBeInTheDocument();
    expect(card.getByText(/te52 hww/i)).toBeInTheDocument();
    // Check the fields
    expect(card.getByLabelText(/colour/i)).toHaveTextContent(/teal/i);
    expect(card.getByLabelText(/fuel/i)).toHaveTextContent(/gasoline/i);
    expect(card.getByLabelText(/vin/i)).toHaveTextContent(/1ustan9z5mnt86399/i);
    expect(card.getByLabelText(/mileage/i)).toHaveTextContent(/70,609/i);
    expect(card.getByLabelText(/registration date/i)).toHaveTextContent(
      /Friday, July 8, 2005/i
    );
  });

  it("handles an error loading the vehicle", async () => {
    server.use(
      rest.get("/api/vehicles/:vehicleId", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );
    render(<Wrapper />);
    expect(
      await screen.findByRole("heading", { name: /something went wrong!/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/500: internal server error/i)).toBeInTheDocument();
    // Try again should reload
    await userEvent.click(screen.getByRole("button", { name: /try again/i }));
    // Wait for the loading card
    expect(
      await screen.findByLabelText(/loading vehicle/i)
    ).toBeInTheDocument();
  });

  it("deletes the vehicle", async () => {
    server.use(
      rest.get("/api/vehicles/:vehicleId", (req, res, ctx) =>
        res(ctx.json(vehicle))
      ),
      rest.delete("/api/vehicles/:vehicleId", (req, res, ctx) =>
        res(ctx.json({ id: req.params.id }))
      )
    );
    render(<Wrapper />);
    // Click the Delete button
    await userEvent.click(
      await screen.findByRole("button", { name: /delete vehicle/i })
    );
    // Check the dialog is correct
    const dialog = within(
      screen.getByRole("dialog", { name: /delete vehicle/i })
    );
    expect(
      dialog.getByText(/are you really sure you want to delete this vehicle\?/i)
    ).toBeInTheDocument();
    // Delete
    await userEvent.click(dialog.getByRole("button", { name: /delete/i }));
    // We should route back to the home page
    await waitFor(() => expect(replace).toHaveBeenCalledWith("/"));
  });

  it("handles errors deleting the vehicle", async () => {
    server.use(
      rest.get("/api/vehicles/:vehicleId", (req, res, ctx) =>
        res(ctx.json(vehicle))
      ),
      rest.delete("/api/vehicles/:vehicleId", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );
    render(<Wrapper />);
    // Click the Delete button
    await userEvent.click(
      await screen.findByRole("button", { name: /delete vehicle/i })
    );
    // Check the dialog is correct
    const dialog = within(
      screen.getByRole("dialog", { name: /delete vehicle/i })
    );
    // Delete
    await userEvent.click(dialog.getByRole("button", { name: /delete/i }));
    // We should get an error
    expect(
      await screen.findByText(/500: internal server error/i)
    ).toBeInTheDocument();
    // The Delete Vehicle button should be gone
    expect(
      screen.queryByRole("button", { name: /delete vehicle/i })
    ).not.toBeInTheDocument();
    // Clear the error
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(
      await screen.findByRole("button", { name: /delete vehicle/i })
    ).toBeInTheDocument();
  });
});
