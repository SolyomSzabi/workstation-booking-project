import axios from "axios";
import appendTokenToHeader from "./RequestInterceptor";

const client = axios.create({
  baseURL: "http://localhost:8081/api"
});

client.interceptors.request.use(appendTokenToHeader);

const getFloors = () => {
  // eslint-disable-next-line no-console
  console.log("GET Request");
  return client.get("/floors");
};

const getFloorsByBuildingId = buildingID => {
  return client.get(`/building/${buildingID}/floors`);
};

const createFloor = floor => {
  return client.post("/floors", { ...floor });
};

const updateFloor = floor => {
  return client.put("/floors", { ...floor });
};

const deleteFloor = floor => {
  return client.delete(`/floors/${floor.floorID}`);
};

// eslint-disable-next-line import/prefer-default-export
export { getFloors, getFloorsByBuildingId, createFloor, updateFloor, deleteFloor };
