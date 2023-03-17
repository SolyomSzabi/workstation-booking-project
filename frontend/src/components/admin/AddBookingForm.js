import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddBookingForm({ addBooking }) {

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState('');
  const [city, setCity] = useState('');
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('');
  const [workstation, setWorkstation] = useState('');
  const [date, setDate] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    const userID = Number(Math.floor(Math.random() * 6) + 1);
    const bookingID = Number(Math.floor(Math.random() * 6) + 1);
    const set = {
      bookingID, userID, user, city, building, floor, workstation, date
    };
    addBooking(set)
  };

  return (
    <div>
      <Button
        align="right"
        variant="outlined"
        onClick={handleClickOpen}>
        New Booking
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Booking</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            type="text"
            id="user"
            label="User"
            fullWidth
            margin="dense"
            variant="standard"
            required
            value={user}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            autoFocus
            type="text"
            id="city"
            label="City"
            fullWidth
            margin="dense"
            variant="standard"
            required
            value={city}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            autoFocus
            type="text"
            id="name"
            label="Building"
            fullWidth
            margin="dense"
            variant="standard"
            required
            value={building}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setBuilding(e.target.value)}
          />
          <TextField
            autoFocus
            type="text"
            id="floor"
            label="Floor"
            fullWidth
            margin="dense"
            variant="standard"
            required
            value={floor}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setFloor(e.target.value)}
          />
          <TextField
            autoFocus
            type="text"
            id="workstation"
            label="Workstation"
            fullWidth
            margin="dense"
            variant="standard"
            required
            value={workstation}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setWorkstation(e.target.value)}
          />
          <TextField
            autoFocus
            id="date"
            label="Date"
            type="date"
            fullWidth
            margin="dense"
            variant="standard"
            required
            value={date}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add New</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
