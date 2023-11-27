import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

api.interceptors.request.use((config) => {
  console.log(localStorage.getItem("ACCESS_TOKEN"));
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "ACCESS_TOKEN"
  )}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      // window.location.reload();
    } else if (response.status === 404) {
      //Show not found
    }

    throw error;
  }
);
export default api;
