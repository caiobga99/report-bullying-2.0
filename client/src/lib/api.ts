import axios from "axios";

const api = axios.create({
  baseURL: "http://10.112.240.174:8080",
  withCredentials: true,
});

export default api;
