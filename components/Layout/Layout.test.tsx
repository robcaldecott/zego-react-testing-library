import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "@/providers";
import { Layout } from ".";

describe("Layout", () => {
  it("renders", () => {
    render(
      <IntlProvider locale="en">
        <ThemeProvider>
          <Layout>Content</Layout>
        </ThemeProvider>
      </IntlProvider>
    );
    // We should kave a header
    expect(screen.getByRole("banner")).toHaveTextContent(/vehicle manager/i);
    // We could have context
    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });
});
