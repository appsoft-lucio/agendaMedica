import axios from "axios";

const api = axios.create({
  baseURL: "https://back-end-autumn-sky-4114.fly.dev",
});

export default api;
