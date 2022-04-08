import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from ".";

describe("Skeleton", () => {
  it("renders", () => {
    render(<Skeleton aria-label="loading" />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it("renders with a custom height", () => {
    render(<Skeleton aria-label="loading" height="64px" />);
    expect(screen.getByLabelText(/loading/i)).toHaveStyle("height: 64px");
  });
});
