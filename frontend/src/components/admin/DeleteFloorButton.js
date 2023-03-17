import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteFloor } from "../../services/floorService";

export default function DeleteFormButton({ level, handleTheDeletedFloor }) {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDialogSubmit = () => {
    setOpen(false);
    deleteFloor(level).then(() => handleTheDeletedFloor(level));
  };

  return (
    <div>
      <Button variant="contained" color="error" aria-label="delete" onClick={handleDialogOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this floor?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The operation cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSubmit} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
