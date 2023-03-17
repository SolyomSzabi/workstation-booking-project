import React from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import DeleteUserDialog from "./DeleteUserDialog";
// import EditBookingForm from "./EditBookingForm";

export default function Booking({ booking, onDelete }) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}>
      <Typography>ID: {booking.bookingID}</Typography>
      <Typography>City: {booking.workstation.floor.building.city}</Typography>
      <Typography>Building: {booking.workstation.floor.building.name}</Typography>
      <Typography>Floor: {booking.workstation.floor.floorName}</Typography>
      <Typography>Workstation: {booking.workstation.workstationID}</Typography>
      <Typography>Date: {booking.date}</Typography>
      <Stack direction="row" spacing={2}>
        <DeleteUserDialog bookingID={booking.bookingID} deleteBooking={onDelete}/>
      </Stack>
    </Stack>
  );
}
