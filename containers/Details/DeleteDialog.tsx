import { FormattedMessage } from "react-intl";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@/components";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteDialog = ({
  open,
  onClose,
  onDelete,
}: DeleteDialogProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="delete-dialog-title"
    aria-describedby="delete-dialog-description"
  >
    <DialogTitle id="delete-dialog-title">
      <FormattedMessage
        id="deleteDialogTitle"
        defaultMessage="Delete vehicle"
      />
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="delete-dialog-description">
        <FormattedMessage
          id="deleteDialogMessage"
          defaultMessage="Are you really sure you want to delete this vehicle?"
        />
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="secondary" onClick={onClose}>
        <FormattedMessage id="cancel" defaultMessage="Cancel" />
      </Button>
      <Button variant="error" onClick={onDelete}>
        <FormattedMessage id="delete" defaultMessage="Delete" />
      </Button>
    </DialogActions>
  </Dialog>
);
