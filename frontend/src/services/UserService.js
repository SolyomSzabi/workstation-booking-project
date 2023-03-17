import axios from "axios";
import appendTokenToHeader from "./RequestInterceptor";

const client = axios.create({
  baseURL: "http://localhost:8081/api"
});

client.interceptors.request.use(appendTokenToHeader);

const getUsers = () => {
  return client.get("/users");
};

const updateUser = user => {
  return client.put("/users", { ...user });
};

const deleteUser = user => {
  return client.delete("/users", { ...user });
};

export { getUsers, updateUser, deleteUser };
