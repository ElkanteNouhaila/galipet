import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { View, Button, Alert } from "react-native";

export default function Profile() {
  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("token");

            const check = await AsyncStorage.getItem("token");
            console.log("AFTER LOGOUT TOKEN:", check); // should be null

            router.replace("/(auth)/login");
          },
        },
      ]
    );
  };

  return (
    <View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}