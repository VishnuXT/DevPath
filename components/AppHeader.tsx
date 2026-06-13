import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Colors, FontSize, FontWeight, Spacing } from "../constants/theme";

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
}

export default function AppHeader({
  title,
  showBack = true,
  rightElement,
}: AppHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Left — Back Button */}
      <View style={styles.side}>
        {showBack && (
          <Pressable
            style={({ pressed }) => [styles.backBtn, pressed && styles.backBtnPressed]}
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
        )}
      </View>

      {/* Center — Title */}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* Right — Optional slot */}
      <View style={styles.side}>{rightElement ?? null}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  side: {
    width: 52,
    alignItems: "flex-start",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backBtnPressed: {
    backgroundColor: Colors.surfaceTertiary,
  },
  backArrow: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: FontWeight.bold,
    lineHeight: 22,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: FontSize.title3,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    letterSpacing: 0.2,
  },
});
