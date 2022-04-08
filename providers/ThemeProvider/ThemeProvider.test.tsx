import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from ".";

describe("ThemeProvider", () => {
  const Component = () => {
    const { mode, setMode } = useTheme();
    return (
      <>
        <span>Mode: {mode}</span>
        <button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
          Toggle
        </button>
      </>
    );
  };

  it("toggles theme", async () => {
    render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    );
    // Initial mode should be light
    expect(screen.getByText(/mode: light/i)).toBeInTheDocument();
    // Toggle dark
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByText(/mode: dark/i)).toBeInTheDocument();
    expect(document.documentElement).toHaveClass("dark");
    // Toggle light
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByText(/mode: light/i)).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass("dark");
  });
});
