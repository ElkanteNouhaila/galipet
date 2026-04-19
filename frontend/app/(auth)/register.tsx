import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import API from "../../services/api";
import { router } from "expo-router";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    try {
      if (loading) return;

      if (!name || !email || !password) {
        Alert.alert("Error", "Please fill all fields");
        return;
      }

      setLoading(true);

      await API.post("/register", {
        name,
        email: email.toLowerCase(),
        password,
        role: "user",
      });

      Alert.alert("Success", "Account created!");

      // 👇 Go back to login after register
      router.replace("/(auth)/login");

    } catch (err: any) {
      console.log("REGISTER ERROR:", err);

      Alert.alert(
        "Error",
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{
          marginBottom: 10,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
        }}
      />

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
        title={loading ? "Creating..." : "Register"}
        onPress={register}
        disabled={loading}
      />

      {/* 👇 Back to login */}
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/login")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ textAlign: "center", color: "blue" }}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}