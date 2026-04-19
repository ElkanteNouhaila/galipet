import axios from "axios";
import { getToken } from "./auth";

const API = axios.create({
  baseURL: "https://galipet.onrender.com",
});

API.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;