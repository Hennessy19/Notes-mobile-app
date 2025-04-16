import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PostItImage from "@/assets/images/post-it.png";
import { useRouter } from "expo-router";

// TouchableOpacity is a wrapper for making views respond properly to touches
// onPress is a prop that allows you to specify a function to be called when the user presses the button
// Image is a component that displays an image on the screen


 const HomeScreen =() => {
  const router = useRouter();
  // The useRouter hook is used to get access to the router object,
  // which allows you to navigate between screens in the app.
  // The router object is used to navigate to different screens in the app.

  return (
    <View
      style={styles.container}
    >
      <Image source={PostItImage} style={styles.image} />
      <Text style={styles.title}>Welcome to Notes App</Text>
      <Text style={styles.subtitle}>Capture your thoughts anytime, anywhere!</Text>
      <TouchableOpacity
        onPress={() => {
          router.push("/notes");
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  image:{
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default HomeScreen;