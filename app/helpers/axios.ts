import axios from "axios";

// Create an instance of axios with default configuration
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
