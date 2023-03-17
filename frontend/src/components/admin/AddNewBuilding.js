import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { createBuilding } from "../../services/BuildingService";

export default function AddNewBuilding({ handleAddBuilding }) {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const [addBuilding, setAddBuilding] = useState({
    name: "",
    country: "",
    postal_code: "",
    city: "",
    address: ""
  });

  const handleDialogChange = event => {
    setAddBuilding({ ...addBuilding, [event.target.name]: event.target.value });
  };

  /*
    name: Joi.string().required(),
  country: Joi.string().required(),
  postal_code: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  */

  const handleDialogSubmit = event => {
    setOpen(false);
    event.preventDefault();
    createBuilding({
      name: addBuilding.name,
      country: addBuilding.name,
      postal_code: addBuilding.postal_code,
      city: addBuilding.city,
      address: addBuilding.address
    }).then(response => handleAddBuilding(response.data.building));
  };

  return (
    <div>
      <Button variant="outlined" sx={{ py: 1, mt: 1 }} onClick={handleDialogOpen}>
        Add New Building
      </Button>
      <form>
        <Dialog open={open} onClose={handleDialogClose}>
          <DialogTitle>Add New Building</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="name"
              type="text"
              fullWidth
              variant="standard"
              value={addBuilding.name}
              onChange={handleDialogChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="country"
              name="country"
              label="country"
              type="text"
              fullWidth
              variant="standard"
              value={addBuilding.country}
              onChange={handleDialogChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="postal_code"
              name="postal_code"
              label="postal_code"
              type="text"
              fullWidth
              variant="standard"
              value={addBuilding.postal_code}
              onChange={handleDialogChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="city"
              name="city"
              label="city"
              type="text"
              fullWidth
              variant="standard"
              value={addBuilding.city}
              onChange={handleDialogChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="address"
              name="address"
              label="address"
              type="text"
              fullWidth
              variant="standard"
              value={addBuilding.address}
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
