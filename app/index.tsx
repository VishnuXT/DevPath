import type { ReactNode } from "react";
import { View, Text, StyleSheet, StatusBar, Pressable, Image } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors, Elevation, FontSize, FontWeight, Radius, Spacing } from "../constants/theme";

function DividerWithLeaf() {
  return (
    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
      <Ionicons name="leaf-outline" size={18} color={Colors.butter} />
      <View style={styles.dividerLine} />
    </View>
  );
}

function CategoryItem({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <View style={styles.categoryItem}>
      {icon}
      <Text style={styles.categoryLabel}>{label}</Text>
    </View>
  );
}

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Image
        source={require("../assets/images/bg.png")}
        style={styles.backgroundImage}
        resizeMode="contain"
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.logoSection}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />

            <Text style={styles.appName}>DevRoot</Text>

            <DividerWithLeaf />

            <Text style={styles.tagline}>
              Learn Development
              {"\n"}
              from the <Text style={styles.taglineAccent}>Roots.</Text>
            </Text>
          </View>

          <View style={styles.categoriesRow}>
            <CategoryItem
              icon={<Feather name="globe" size={38} color={Colors.primary} strokeWidth={1.8} />}
              label="Web"
            />
            <View style={styles.categoryDivider} />
            <CategoryItem
              icon={
                <Feather name="database" size={38} color={Colors.primary} strokeWidth={1.8} />
              }
              label="Backend"
            />
            <View style={styles.categoryDivider} />
            <CategoryItem
              icon={
                <Ionicons name="phone-portrait-outline" size={40} color={Colors.primary} />
              }
              label="Mobile"
            />
          </View>

          {/* Spacer to push content correctly layout-wise */}
          <View style={styles.spacer} />

          <Pressable
            style={({ pressed }) => [styles.startBtn, pressed && styles.startBtnPressed]}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.startBtnText}>Get Started</Text>
          </Pressable>

          <View style={styles.footer}>
            <Ionicons name="leaf-outline" size={20} color={Colors.butter} />
            <Text style={styles.footerText}>Built by AVLRVisions</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backgroundImage: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -60,
    width: "100%",
    aspectRatio: 1024 / 544,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  logoSection: {
    alignItems: "center",
    marginTop: Spacing.hero,
  },
  logoImage: {
    width: 180,
    height: 180,
    marginBottom: Spacing.sm,
  },
  appName: {
    marginTop: Spacing.sm,
    fontSize: 52,
    lineHeight: 58,
    fontWeight: FontWeight.black,
    color: Colors.primary,
    letterSpacing: -1.2,
    textAlign: "center",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  dividerLine: {
    width: 120,
    height: 1.5,
    backgroundColor: Colors.butter,
    opacity: 0.9,
  },
  tagline: {
    fontSize: 28,
    lineHeight: 36,
    textAlign: "center",
    color: Colors.textPrimary,
    fontWeight: FontWeight.regular,
    marginBottom: Spacing.xxxl,
  },
  taglineAccent: {
    color: Colors.primary,
    fontWeight: FontWeight.semiBold,
  },
  categoriesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginBottom: Spacing.xxxl,
    paddingVertical: Spacing.sm,
  },
  categoryItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 92,
  },
  categoryLabel: {
    marginTop: 10,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
    fontWeight: FontWeight.medium,
  },
  categoryDivider: {
    width: 1,
    height: 44,
    backgroundColor: Colors.butter,
    marginHorizontal: Spacing.lg,
  },
  spacer: {
    flex: 1,
  },
  startBtn: {
    alignSelf: "center",
    minWidth: 200,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.primaryDark,
    ...Elevation.md,
  },
  startBtnPressed: {
    backgroundColor: Colors.primaryDark,
  },
  startBtnText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
    letterSpacing: 0.3,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  footerText: {
    fontSize: FontSize.body,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
  },
});

