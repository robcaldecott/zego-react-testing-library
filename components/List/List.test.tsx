import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { List, ListItem, ListItemText } from ".";

describe("List", () => {
  it("renders as a list", () => {
    render(
      <List>
        <ListItem>
          <ListItemText primary="Primary" secondary="Secondary" />
        </ListItem>
      </List>
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toHaveTextContent(/primary/i);
    expect(screen.getByRole("listitem")).toHaveTextContent(/secondary/i);
  });

  it("renders as a button", () => {
    render(
      <List>
        <ListItem button component="button">
          <ListItemText primary="Primary" secondary="Secondary" />
        </ListItem>
      </List>
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/primary/i);
    expect(screen.getByRole("button")).toHaveTextContent(/secondary/i);
  });
});
