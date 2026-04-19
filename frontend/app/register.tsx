// import { useState } from "react";
// import { View, TextInput, Button, Alert } from "react-native";
// import API from "../services/api";
// import { router } from "expo-router";
// import axios from "axios";

// export default function RegisterScreen() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const register = async () => {
//     if (!name || !email || !password) {
//       return Alert.alert("Error", "All fields are required");
//     }

//     try {
//       setLoading(true);

//       await API.post("/register", {
//         name,
//         email,
//         password,
//         role: "user",
//       });

//       setName("");
//       setEmail("");
//       setPassword("");

//       Alert.alert("Success", "Account created!");

//       router.replace("/");

//     } catch (err) {
//         console.log("ERROR:", err);
      
//         if (axios.isAxiosError(err)) {
//           Alert.alert(
//             "Error",
//             err.response?.data?.message || "Registration failed"
//           );
//         } else {
//           Alert.alert("Error", "Something went wrong");
//         }
//       } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <TextInput
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={(text) => setEmail(text.toLowerCase())}
//       />

//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <Button
//         title={loading ? "Creating..." : "Register"}
//         onPress={register}
//         disabled={loading}
//       />
//     </View>
//   );
// }

import RegisterScreen from "../screens/registerscreen";

export default function Register() {
  return <RegisterScreen />;
}