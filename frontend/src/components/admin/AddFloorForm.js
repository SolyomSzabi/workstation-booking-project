import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { createFloor } from "../../services/floorService";

export default function AddFloorForm({ handleAddFloor, buildingID }) {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };
  
  const handleDialogClose = () => {
    setOpen(false);
  };

  const [newFloor, setNewFloor] = useState({
    capacity: "",
    floorName: "",
    building: buildingID
  });

  const handleDialogChange = event => {
    setNewFloor({ ...newFloor, [event.target.name]: event.target.value });
  };

  const handleDialogSubmit = async event => {
    setOpen(false);
    event.preventDefault();

    const { data } = await createFloor(newFloor);

    handleAddFloor(data.floor);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleDialogOpen}>
        Add New Floor
      </Button>
      <form>
        <Dialog open={open} onClose={handleDialogClose}>
          <DialogTitle>Add New Floor</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="capacity"
              name="capacity"
              label="capacity"
              type="text"
              fullWidth
              variant="standard"
              value={newFloor.capacity}
              onChange={handleDialogChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="floorName"
              name="floorName"
              label="floorName"
              type="text"
              fullWidth
              variant="standard"
              value={newFloor.floorName}
              onChange={handleDialogChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogSubmit}>Add</Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
