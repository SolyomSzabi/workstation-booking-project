import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { updateFloor } from "../../services/floorService";

export default function EditFloorForm({ floor, index, handleTheEditedFloor }) {
  const [editFloor, setEditFloor] = useState({
    floorID: floor.floorID,
    capacity: floor.capacity,
    floorName: floor.floorName
  });

  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDialogChange = event => {
    setEditFloor({ ...editFloor, [event.target.name]: event.target.value });
  };

  const handleDialogSubmit = event => {
    setOpen(false);
    event.preventDefault();
    updateFloor(editFloor).then(() => {
      handleTheEditedFloor(editFloor, index);
    });
  };

  return (
    <div>
      <Button variant="contained" color="warning" onClick={handleDialogOpen}>
        Edit
      </Button>
      <form>
        <Dialog open={open} onClose={handleDialogClose}>
          <DialogTitle>Edit Workstation</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id={String(floor.capacity)}
              name="capacity"
              label="Capacity"
              type="text"
              fullWidth
              variant="standard"
              value={editFloor.capacity}
              onChange={handleDialogChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id={String(floor.floorName)}
              name="floorName"
              label="Floor Name"
              type="text"
              fullWidth
              variant="standard"
              value={editFloor.floorName}
              onChange={handleDialogChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogSubmit}>Edit</Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
