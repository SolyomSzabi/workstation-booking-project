import axios from "axios";
import appendTokenToHeader from "./RequestInterceptor";

const client = axios.create({
  baseURL: "http://localhost:8081/api"
});

client.interceptors.request.use(appendTokenToHeader);

const getWorkstations = () => {
  // eslint-disable-next-line no-console
  console.log("GET Request");
  return client.get("/workstations");
};

const deleteWorkstation = workstation => {
  // eslint-disable-next-line no-console
  console.log("DELETE Request");
  return client.delete(`/workstations/${workstation.workstationID}`);
};

const getFloors = () => {
  // eslint-disable-next-line no-console
  console.log("GET Request");
  return client.get("/floors");
};

const getBookings = () => {
  // eslint-disable-next-line no-console
  console.log("GET Request");
  return client.get("/bookings");
};

// eslint-disable-next-line import/prefer-default-export
export { getWorkstations, getFloors, getBookings, deleteWorkstation };
