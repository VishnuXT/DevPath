import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import PathCard from "../components/PathCard";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Choose Your Path
      </Text>

      <PathCard
        emoji="🌐"
        title="Web Development"
        onPress={() => router.push("/web")}
      />

      <PathCard
        emoji="📱"
        title="Mobile Development"
        onPress={() => router.push("/mobile")}
      />

      <PathCard
        emoji="⚙️"
        title="Backend Development"
        onPress={() => router.push("/backend")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
    paddingTop: 70,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
});