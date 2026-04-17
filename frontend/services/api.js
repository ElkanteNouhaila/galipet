import axios from "axios";
import { getToken } from "./auth";

const API = axios.create({
  baseURL: "https://5c55-160-178-26-81.ngrok-free.app",
});

API.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;