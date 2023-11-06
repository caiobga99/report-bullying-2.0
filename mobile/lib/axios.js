import axios from "axios";

const api = axios.create({
  baseURL: "http://10.112.240.174:8082",
});

export default api;
