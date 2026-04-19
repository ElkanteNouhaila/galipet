import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { View, Button } from "react-native";

export default function Profile() {
  const logout = async () => {
    await AsyncStorage.removeItem("token");

    const check = await AsyncStorage.getItem("token");
    console.log("AFTER LOGOUT TOKEN:", check); 

    router.replace("/(auth)/login");
  };

  return (
    <View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}