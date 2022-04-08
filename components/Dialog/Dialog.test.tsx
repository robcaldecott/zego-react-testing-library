import { vi, describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from ".";

describe("Dialog", () => {
  it("renders", async () => {
    const handleClose = vi.fn();
    render(
      <Dialog
        open
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Title</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">Content</DialogContentText>
        </DialogContent>
        <DialogActions>
          <button>OK</button>
        </DialogActions>
      </Dialog>
    );
    const dialog = within(screen.getByRole("dialog", { name: /title/i }));
    expect(
      dialog.getByRole("heading", { name: /title/i, level: 2 })
    ).toBeInTheDocument();
    expect(dialog.getByText(/content/i)).toBeInTheDocument();
    expect(dialog.getByRole("button", { name: /ok/i })).toBeInTheDocument();
    // Close the dialog by clicking on the background
    await userEvent.click(screen.getByRole("presentation"));
    expect(handleClose).toHaveBeenCalled();
    handleClose.mockReset();
    // Close the dialog by pressing the ESC key
    await userEvent.type(document.documentElement, "{Escape}");
    expect(handleClose).toHaveBeenCalled();
  });
});
