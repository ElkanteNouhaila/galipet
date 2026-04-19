import axios from "axios";
import { getToken } from "./auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const API = axios.create({
  baseURL: "https://galipet.onrender.com",
});

// ✅ Attach token to every request
API.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Handle expired / invalid token globally
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      console.log("TOKEN EXPIRED → logging out");

      await AsyncStorage.removeItem("token");
      router.replace("/(auth)/login");
    }

    return Promise.reject(error);
  }
);

export default API;