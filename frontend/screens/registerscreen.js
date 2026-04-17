import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import API from "../services/api";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      
      await API.post("/register", {
        name,
        email,
        password,
        role: "owner",
      });

      Alert.alert("Success", "Account created!");
    } catch (err) {
      Alert.alert("Error", err.response?.data?.message || "Error");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Name" onChangeText={setName} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Register" onPress={register} />
    </View>
  );
}

