import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../services/api";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      if (loading) return;

      if (!email || !password) {
        Alert.alert("Error", "Please fill all fields");
        return;
      }

      setLoading(true);

      const res = await API.post("/login", {
        email: email.toLowerCase(),
        password,
      });

      await AsyncStorage.setItem("token", res.data.token);

      router.replace("/(tabs)/home");

    } catch (err: any) {
      console.log("LOGIN ERROR:", err);

      Alert.alert(
        "Error",
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          marginBottom: 10,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{
          marginBottom: 10,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
        }}
      />

      <Button
        title={loading ? "Loading..." : "Login"}
        onPress={login}
        disabled={loading}
      />

      {/* 👇 Register navigation */}
      <TouchableOpacity
        onPress={() => router.push("/(auth)/register")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ textAlign: "center", color: "blue" }}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}