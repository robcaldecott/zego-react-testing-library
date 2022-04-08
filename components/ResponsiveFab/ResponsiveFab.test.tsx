import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StarIcon } from "@heroicons/react/solid";
import { ResponsiveFab } from ".";

describe("ResponsiveFab", () => {
  it("renders", () => {
    render(
      <ResponsiveFab
        icon={StarIcon}
        label="Caption"
        href="/"
        aria-label="Label"
      />
    );
    expect(screen.getAllByRole("link", { name: /label/i })).toHaveLength(2);
    expect(screen.getByText(/caption/i)).toBeInTheDocument();
  });
});
