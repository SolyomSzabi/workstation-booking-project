import axios from "axios";
import appendTokenToHeader from "./RequestInterceptor";

const client = axios.create({
  baseURL: "http://localhost:8081/api"
});

client.interceptors.request.use(appendTokenToHeader);

const getBuildings = () => {
  // eslint-disable-next-line no-console
  console.log("GET Request");
  return client.get("/buildings");
};

const createBuilding = building => {
  return client.post("/buildings", { ...building });
};

const updateBuilding = building => {
  return client.put("/buildings", { ...building });
};

const deleteBuilding = building => {
  return client.delete(`/buildings/${building.buildingID}`);
};

// eslint-disable-next-line import/prefer-default-export
export { getBuildings, createBuilding, updateBuilding, deleteBuilding };
