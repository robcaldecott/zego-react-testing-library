import { vi, describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from ".";

describe("Select", () => {
  const options = (
    <>
      <option value="" disabled>
        Select a fruit
      </option>
      <option value="apples">Apples</option>
      <option value="bananas">Bananas</option>
      <option value="oranges">Oranges</option>
    </>
  );

  it("renders", async () => {
    const handleChange = vi.fn();
    render(
      <Select label="Label" value="apples" onChange={handleChange}>
        {options}
      </Select>
    );
    const select = within(screen.getByRole("combobox", { name: /label/i }));
    expect(
      select.getByRole("option", { name: /select a fruit/i, selected: false })
    ).toBeInTheDocument();
    expect(
      select.getByRole("option", { name: /apples/i, selected: true })
    ).toBeInTheDocument();
    expect(
      select.getByRole("option", { name: /bananas/i, selected: false })
    ).toBeInTheDocument();
    expect(
      select.getByRole("option", { name: /oranges/i, selected: false })
    ).toBeInTheDocument();

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /label/i }),
      "oranges"
    );
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders with an error", () => {
    render(
      <Select label="Label" error="An error">
        {options}
      </Select>
    );
    expect(screen.getByText(/an error/i)).toBeInTheDocument();
  });

  it("renders required", () => {
    render(
      <Select label="Label" isRequired>
        {options}
      </Select>
    );
    screen.getByRole("combobox", { name: /label/i });
  });
});
