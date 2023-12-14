import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});

export default axiosInstance;
