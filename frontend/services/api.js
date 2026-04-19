import axios from "axios";
import { getToken } from "./auth";

const API = axios.create({
  baseURL: "http://10.219.40.144:5000",
});

API.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;