import { Pressable, Text, StyleSheet } from "react-native";

interface PathCardProps {
  emoji: string;
  title: string;
  onPress: () => void;
}

export default function PathCard({
  emoji,
  title,
  onPress,
}: PathCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },

  emoji: {
    fontSize: 28,
    marginRight: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});