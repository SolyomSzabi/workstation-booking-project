import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


export default function EditBookingForm({ booking, editBooking }) {

  const [open, setOpen] = useState(false);
  const [city, setCity] = useState(booking.city);
  const [building, setBuilding] = useState(booking.building);
  const [floor, setFloor] = useState(booking.floor);
  const [workstation, setWorkstation] = useState(booking.workstation);
  const [date, setDate] = useState(booking.date);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);

    const set = {
      bookingID: booking.bookingID, userID: booking.userID, city, building, floor, workstation, date
    };

    editBooking(set)
  };

  return (
    <div>
      <IconButton aria-label="delete" size="small" onClick={handleClickOpen}>
        <EditIcon fontSize="small" />
      </IconButton >
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id={city}
            label="City"
            type="text"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id={building}
            label="Building"
            type="text"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            defaultValue={building}
            onChange={(e) => setBuilding(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id={floor}
            label="Floor"
            type="text"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            defaultValue={floor}
            onChange={(e) => setFloor(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id={workstation}
            label="Workstation"
            type="text"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            defaultValue={workstation}
            onChange={(e) => setWorkstation(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id={date}
            label="Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            defaultValue={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Edit Booking</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};