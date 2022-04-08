import { useState } from "react";
import { ComponentMeta } from "@storybook/react";
import { Button } from "../Button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from ".";

export default {
  title: "Components/Dialog",
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

export const Controlled = () => {
  const [open, setOpen] = useState(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>

      <Dialog
        open={open}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        onClose={onClose}
      >
        <DialogTitle id="dialog-title">
          Use Google&apos;s location service?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="secondary" onClick={onClose}>
            Disagree
          </Button>
          <Button variant="primary" onClick={onClose}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
