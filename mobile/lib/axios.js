import axios from "axios";

const api = axios.create({
  baseURL: "http://10.112.240.210:8000",
});

export default api;
