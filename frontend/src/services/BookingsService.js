/* eslint-disable no-console */
import axios from "axios";
import appendTokenToHeader from "./RequestInterceptor";

const client = axios.create({
  baseURL: "http://localhost:8081/api"
});

client.interceptors.request.use(appendTokenToHeader);

const getBookings = () => {
  return client.get("/bookings");
};

const updateBooking = booking => {
  return client.put("/bookings", { ...booking });
};

const deleteBooking = bookingID => {
  console.log("BookingsService szisza");
  return client.delete(`/bookings/${bookingID}`);
};

export { getBookings, updateBooking, deleteBooking };
