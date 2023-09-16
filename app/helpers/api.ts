import axios from "axios";

// Create an instance of axios with default configuration
const api = axios.create({
  baseURL: "/api",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
