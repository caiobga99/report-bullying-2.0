import axios from "axios";

const api = axios.create({
  baseURL: "http://10.112.240.174:8081",
});

export default api;
