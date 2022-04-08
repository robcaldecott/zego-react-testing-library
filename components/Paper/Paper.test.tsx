import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Paper } from ".";

describe("Paper", () => {
  it("renders", () => {
    render(<Paper aria-label="paper">Content</Paper>);
    expect(screen.getByLabelText(/paper/i)).toBeInTheDocument();
    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });

  it("renders as a custom component", () => {
    render(<Paper component="header" />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
