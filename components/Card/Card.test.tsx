import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Card, CardHeader, CardContent, CardActions } from ".";

describe("Card", () => {
  it("renders", () => {
    render(
      <Card aria-label="card">
        <CardHeader title="Title" subheader="Subheader" />
        <CardContent>Content</CardContent>
        <CardActions>
          <button>Action</button>
        </CardActions>
      </Card>
    );
    const card = within(screen.getByLabelText(/card/i));
    expect(card.getByText(/title/i)).toBeInTheDocument();
    expect(card.getByText(/subheader/i)).toBeInTheDocument();
    expect(card.getByText(/content/i)).toBeInTheDocument();
    expect(card.getByRole("button", { name: /action/i })).toBeInTheDocument();
  });
});
