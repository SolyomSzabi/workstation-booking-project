/* eslint-disable no-console */
// import { useState } from "react";
import React, { useState, useEffect } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import SwitchButton from "./SwitchButton";
import Bookings from "./Bookings";
import AddBookingForm from "./AddBookingForm";

// import { dummyUsers, dummyBookings } from "../dummy/dummy_data";
import { getUsers } from "../../services/UserService";
import { getBookings } from "../../services/BookingsService";

export default function UserAccordions() {
  const [expanded, setExpanded] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data } = await getBookings();
      setBookings(data);
    };

    fetchBookings();
  }, []);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
/*
  const getUserBookings = userId => {
    const userBookings = bookings.filter(booking => booking.user === userId);
    return userBookings;
  };
*/
  const deleteBooking = (userID, bookingID) => {
    const userIndex = users.findIndex(user => user.userID === userID);
    const userToUpdate = users[userIndex]
    const userBookings = userToUpdate.booking;
    const newBookings = userBookings.filter(booking => booking.bookingID !== bookingID);
    userToUpdate.booking = newBookings;
    const updatedUsers = users.map((user, index) =>{
      if(index === userIndex) {
        return userToUpdate;
      }
        return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <div>
      {users.map((user) => (
        <Accordion
          key={user.userID} expanded={expanded === `panel${user.userID}`} onChange={handleChange(`panel${user.userID}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header">
            <Typography
              sx={{ width: "33%", flexShrink: 1 }}>{user.userName}</Typography>
            <SwitchButton />
          </AccordionSummary>
          <AccordionDetails>
            <Bookings
              user={user}
              deleteBooking={deleteBooking}
            />
          </AccordionDetails>
        </Accordion>))
      }
      <AddBookingForm
        // addBooking={addBooking}
        bookings={bookings}
      />
    </div>
  );
}
