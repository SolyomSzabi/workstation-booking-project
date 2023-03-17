import axios from "axios";
import appendTokenToHeader from "./RequestInterceptor";

const client = axios.create({
  baseURL: "http://localhost:8081/auth"
});

const addUsers = user => {
  return client.post("/registration", { ...user });
};

const LoginUsers = user => {
  return client.post("/login", { ...user });
};

const adminView = () => {
  client.interceptors.request.use(appendTokenToHeader);
  return client.get("/admin-view");
};

export { addUsers, LoginUsers, adminView };
