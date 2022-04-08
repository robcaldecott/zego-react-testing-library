import { vi, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe("Button", () => {
  test("click", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Label</Button>);
    await userEvent.click(screen.getByRole("button", { name: /label/i }));
    expect(handleClick).toHaveBeenCalled();
  });

  test("disabled", async () => {
    render(
      <Button disabled onClick={vi.fn()}>
        Label
      </Button>
    );
    expect(screen.getByRole("button", { name: /label/i })).toBeDisabled();
  });
});
