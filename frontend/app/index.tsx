import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("TOKEN FOUND:", token);
        setTimeout(() => {
          if (token) {
            router.replace("/(tabs)/home");
          } else {
            router.replace("/(auth)/login");
          }
        }, 300);

      } catch (err) {
        console.log(err);
        router.replace("/(auth)/login");
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
