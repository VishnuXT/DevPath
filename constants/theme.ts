// ─────────────────────────────────────────────
// DevRoot Design System
// ─────────────────────────────────────────────

// COLOR PALETTE
export const Colors = {
  // Primary Forest Green
  primary: "#1B5E20",
  primaryDark: "#14501A",
  primaryLight: "#A5D6A7",
  primaryAlpha08: "rgba(27, 94, 32, 0.08)",
  primaryAlpha15: "rgba(27, 94, 32, 0.15)",

  // Achievement Gold
  butter: "#D4AF37",
  butterMid: "#E0C15A",
  butterDark: "#B9921D",
  butterAlpha40: "rgba(212, 175, 55, 0.40)",
  achievementGold: "#D4AF37",
  achievementLight: "#F5E6A3",

  // Backgrounds
  background: "#F8FAF8",
  surface: "#FFFFFF",
  surfaceSecondary: "#F3F7F3",
  surfaceTertiary: "#F3F4F6",

  // Text
  textPrimary: "#1F2937",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  textInverse: "#FFFFFF",
  textButter: "#1F2937",

  // Borders
  border: "#E5E7EB",
  borderLight: "#F3F4F6",

  // Status
  success: "#22C55E",
  successBg: "#DCFCE7",
  successText: "#166534",
  error: "#EF4444",
  errorBg: "#FEE2E2",
  errorText: "#B91C1C",
  warning: "#F59E0B",
  warningBg: "#FFFBEB",
} as const;

// TYPOGRAPHY SCALE
export const FontSize = {
  hero: 38,
  title1: 28,
  title2: 22,
  title3: 18,
  body: 15,
  bodySmall: 14,
  label: 12,
  caption: 11,
} as const;

export const FontWeight = {
  black: "900" as const,
  bold: "700" as const,
  semiBold: "600" as const,
  medium: "500" as const,
  regular: "400" as const,
};

// SPACING (8pt grid)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  section: 40,
  hero: 56,
} as const;

// BORDER RADIUS
export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  pill: 999,
} as const;

// ELEVATION (green-tinted shadows — not harsh black)
export const Elevation = {
  sm: {
    shadowColor: "#1B5E20",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  md: {
    shadowColor: "#1B5E20",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  lg: {
    shadowColor: "#1B5E20",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 18,
    elevation: 6,
  },
} as const;

// REUSABLE CARD BASE
export const CardBase = {
  backgroundColor: Colors.surface,
  borderRadius: Radius.xl,
  borderWidth: 1,
  borderColor: Colors.border,
  ...Elevation.sm,
} as const;

// LABEL CHIP (uppercase tracking label)
export const LabelChip = {
  fontSize: FontSize.caption,
  fontWeight: FontWeight.bold,
  letterSpacing: 1.2,
  textTransform: "uppercase" as const,
};
