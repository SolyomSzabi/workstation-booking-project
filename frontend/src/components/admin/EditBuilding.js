import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { updateBuilding } from "../../services/BuildingService";

export default function EditBuilding({ building, index, handleTheEditedBuilding }) {
  const [editBuilding, setEditBuilding] = useState({
    buildingID: building.buildingID,
    name: building.name,
    country: building.country,
    postal_code: building.postal_code,
    city: building.city,
    address: building.address
  });

  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDialogChange = event => {
    setEditBuilding({ ...editBuilding, [event.target.name]: event.target.value });
  };

  const handleDialogSubmit = event => {
    setOpen(false);
    event.preventDefault();
    updateBuilding(editBuilding).then(() => {
      handleTheEditedBuilding(editBuilding, index);
    });
  };

  return (
    <div>
      <Button sx={{ width: 1 }} variant="contained" color="primary" onClick={handleDialogOpen}>
        Edit Building
      </Button>
      <form>
        <Dialog open={open} onClose={handleDialogClose}>
          <DialogTitle>Edit Workstation</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id={building.name}
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={editBuilding.name}
              onChange={handleDialogChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id={building.country}
              name="country"
              label="Country"
              type="text"
              fullWidth
              variant="standard"
              value={editBuilding.country}
              onChange={handleDialogChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id={building.postal_code}
              name="postal_code"
              label="Postal code"
              type="text"
              fullWidth
              variant="standard"
              value={editBuilding.postal_code}
              onChange={handleDialogChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id={building.city}
              name="city"
              label="city"
              type="text"
              fullWidth
              variant="standard"
              value={editBuilding.city}
              onChange={handleDialogChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id={building.address}
              name="address"
              label="address"
              type="text"
              fullWidth
              variant="standard"
              value={editBuilding.address}
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
