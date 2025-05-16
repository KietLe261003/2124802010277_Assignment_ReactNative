import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { app } from "../../../../Config/firebaseconfig";
import { useNavigation } from "expo-router";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const auth = getAuth(app);
  const navigate = useNavigation<any>();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, phone, password);
    } catch (error) {
      alert("Đăng nhập thất bại: " + error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant App</Text>

      <TextInput
        placeholder="Test@gmail.com"
        style={styles.input}
        keyboardType="email-address"
        value={phone}
        onChangeText={setPhone}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={styles.passwordInput}
          secureTextEntry={hidePassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <MaterialIcons
            name={hidePassword ? "visibility" : "visibility-off"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton} onPress={()=> navigate.navigate("Register")}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    alignSelf: "center",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  forgotPassword: {
    color: "#DAA520",
    alignSelf: "center",
    marginBottom: 20,
    fontWeight: "500",
  },
  signInButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
  },
  signInText: {
    color: "#aaa",
    fontWeight: "bold",
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: "#3F51B5",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  signUpText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
