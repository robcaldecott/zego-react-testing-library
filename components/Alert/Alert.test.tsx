import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Alert } from ".";

describe("Alert", () => {
  it("renders without an action", () => {
    render(<Alert label="Label" />);
    const alert = within(screen.getByRole("alert"));
    expect(alert.getByText(/label/i)).toBeInTheDocument();
  });

  it("renders with an action", () => {
    render(<Alert label="Label" action={<button>Button</button>} />);
    const alert = within(screen.getByRole("alert"));
    expect(alert.getByText(/label/i)).toBeInTheDocument();
    expect(alert.getByRole("button", { name: /button/i })).toBeInTheDocument();
  });
});
