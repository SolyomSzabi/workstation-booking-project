import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { deleteBuilding } from "../../services/BuildingService";

export default function DeleteBuilding({ building, handleTheDeletedBuilding }) {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDialogSubmit = () => {
    setOpen(false);
    deleteBuilding(building).then(() => handleTheDeletedBuilding(building));
  };

  return (
    <div>
      <Button sx={{ width: 1 }} variant="contained" aria-label="delete" onClick={handleDialogOpen}>
        Delete Building
      </Button>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this building?
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
