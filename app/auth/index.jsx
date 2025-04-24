import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

const AuthScreen = () => {
  const {login, register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async () => {
    if (!email || !password) {
        setError("Email and password are required");
        return;
    }
    if (isRegistering && password !== confirmPassword) {
        setError("Passwords do not match");
        return;
    } 
};


  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isRegistering? 'Sign Up' : "Login"}</Text>
      {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
        />
            <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
        />
        {isRegistering && (
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
            />
        )}
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
            }}
        >
            <Text style={styles.buttonText}>{isRegistering ? "Sign Up" : "Login"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsRegistering(!isRegistering)}
        >
            <Text style={styles.switchText}>
                {isRegistering ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding:12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16
    },

  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchText: {
    color: "#007bff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  error:{
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  }
});

export default AuthScreen;