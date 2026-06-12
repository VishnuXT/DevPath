import { View, Text, Pressable, StyleSheet } from "react-native";

export default function PathCard({
  emoji,
  title,
  onPress,
}: any) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <Text style={styles.emoji}>{emoji}</Text>

      <Text style={styles.title}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },

  emoji: {
    fontSize: 30,
    marginRight: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});