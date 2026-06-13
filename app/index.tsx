import { View, Text, StyleSheet, Pressable, StatusBar } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, FontSize, FontWeight, Spacing, Radius, Elevation } from "../constants/theme";

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />

      <View style={styles.logoSection}>
        <View style={styles.logoRing}>
          <Text style={styles.logoEmoji}>🌱</Text>
        </View>

        <Text style={styles.appName}>DevRoot</Text>
        <Text style={styles.tagline}>Learn Development from the Roots.</Text>
      </View>

      <View style={styles.features}>
        {[
          { icon: "🌱", text: "Step-by-step learning paths" },
          { icon: "📘", text: "Beginner-friendly lessons" },
          { icon: "🧩", text: "Real projects and quizzes" },
        ].map((f, i) => (
          <View key={i} style={styles.featureRow}>
            <Text style={styles.featureIcon}>{f.icon}</Text>
            <Text style={styles.featureText}>{f.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.ctaSection}>
        <Pressable
          style={({ pressed }) => [styles.ctaBtn, pressed && styles.ctaBtnPressed]}
          onPress={() => router.push("/home")}
        >
          <Text style={styles.ctaBtnText}>Get Started</Text>
          <Text style={styles.ctaBtnArrow}>→</Text>
        </Pressable>

        <Text style={styles.ctaHint}>Free to use - no account required</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    justifyContent: "space-between",
    paddingBottom: Spacing.xxxl,
  },
  circleTopRight: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.primaryLight,
    opacity: 0.3,
  },
  circleBottomLeft: {
    position: "absolute",
    bottom: -80,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: Colors.primaryLight,
    opacity: 0.2,
  },
  logoSection: {
    alignItems: "center",
    marginTop: Spacing.hero,
  },
  logoRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.butter,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
    ...Elevation.lg,
  },
  logoEmoji: {
    fontSize: 48,
  },
  appName: {
    fontSize: 48,
    fontWeight: FontWeight.black,
    color: Colors.textInverse,
    letterSpacing: -1,
    marginBottom: Spacing.sm,
  },
  tagline: {
    fontSize: FontSize.body,
    color: Colors.butter,
    fontWeight: FontWeight.medium,
    letterSpacing: 1,
  },
  features: {
    gap: Spacing.md,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  featureIcon: {
    fontSize: 22,
  },
  featureText: {
    fontSize: FontSize.body,
    color: "rgba(255,255,255,0.9)",
    fontWeight: FontWeight.medium,
  },
  ctaSection: {
    alignItems: "center",
    gap: Spacing.md,
  },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.butter,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxxl,
    width: "100%",
    gap: Spacing.sm,
    ...Elevation.md,
  },
  ctaBtnPressed: {
    backgroundColor: Colors.butterMid,
  },
  ctaBtnText: {
    fontSize: FontSize.title3,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  ctaBtnArrow: {
    fontSize: FontSize.title3,
    fontWeight: FontWeight.bold,
    color: Colors.primaryDark,
  },
  ctaHint: {
    fontSize: FontSize.caption,
    color: "rgba(255,255,255,0.45)",
    fontWeight: FontWeight.medium,
  },
});
