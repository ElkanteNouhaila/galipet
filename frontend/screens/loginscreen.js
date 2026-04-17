import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../services/api";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true); 

      const res = await API.post("/login", {
        email,
        password,
      });

      const token = res.data.token;

      await AsyncStorage.setItem("token", token);

      Alert.alert("Success", "Logged in!");

      router.replace("/home"); 

    } catch (err) {
      console.log("FULL ERROR:", err);

      Alert.alert(
        "Error",
        err.response?.data?.message || err.message || "Unknown error"
      );

    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title={loading ? "Loading..." : "Login"}
        onPress={login}
        disabled={loading}
      />
    </View>
  );
}