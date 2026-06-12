import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🚀</Text>

      <Text style={styles.title}>DevPath</Text>

      <Text style={styles.subtitle}>
        Learn. Build. Grow.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  logo: {
    fontSize: 80,
  },

  title: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    marginTop: 20,
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 18,
    marginTop: 10,
  },

  button: {
    marginTop: 40,
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 12,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});