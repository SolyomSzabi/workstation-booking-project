/* eslint-disable no-console */
import React from 'react';

import { deleteBooking } from '../../services/BookingsService';
import Booking from './Booking';

export default function Bookings({ user, editDataBooking }) {

  const handleDeleteBooking = (bookingID) => {
    console.log("bookings szisza");
    deleteBooking(bookingID);
  };

  const handleEditBooking = (editBooking) => {
    editDataBooking(editBooking)
  };

  return (
    <div >
      {
        user.booking.map((booking) => (
          <Booking
            userID = {user.userID}
            key={booking.bookingID}
            onDelete={handleDeleteBooking}
            booking={booking}
            editBooking={handleEditBooking} />
        ))
      }
    </div>)
};
