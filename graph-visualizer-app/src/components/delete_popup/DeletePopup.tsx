import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface DeletePopupProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({
  open,
  onClose,
  onDelete,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete your selection?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDelete} variant="contained" color="error">
          Delete
        </Button>
        <Button onClick={onClose} variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePopup;
