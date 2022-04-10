import { vi, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextField } from ".";

describe("TextField", () => {
  test("with a label", async () => {
    const handleChange = vi.fn();
    render(<TextField label="Label" value="" onChange={handleChange} />);
    await userEvent.type(
      screen.getByRole("textbox", { name: /label/i }),
      "test"
    );
    expect(handleChange).toHaveBeenCalled();
  });

  test("disabled", async () => {
    render(<TextField label="Label" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  test("error", () => {
    render(<TextField label="Label" error="Error" />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
