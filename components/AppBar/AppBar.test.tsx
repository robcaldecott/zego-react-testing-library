import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppBar } from ".";

describe("AppBar", () => {
  it("renders", () => {
    render(<AppBar>Content</AppBar>);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });
});
