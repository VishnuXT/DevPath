// ─────────────────────────────────────────────
// DevPath Design System
// ─────────────────────────────────────────────

// COLOR PALETTE
export const Colors = {
  // Primary — Deep Forest Green
  primary: "#013E37",
  primaryDark: "#012B26",
  primaryLight: "#02695E",
  primaryAlpha08: "rgba(1, 62, 55, 0.08)",
  primaryAlpha15: "rgba(1, 62, 55, 0.15)",

  // Secondary — Soft Butter Yellow
  butter: "#FFEFB3",
  butterMid: "#F7D774",
  butterDark: "#E8C24A",
  butterAlpha40: "rgba(255, 239, 179, 0.40)",

  // Backgrounds
  background: "#F5F7F5",
  surface: "#FFFFFF",
  surfaceSecondary: "#EEF3F0",
  surfaceTertiary: "#E6EDE9",

  // Text
  textPrimary: "#013E37",
  textSecondary: "#4A706A",
  textMuted: "#8AA49F",
  textInverse: "#FFFFFF",
  textButter: "#FFEFB3",

  // Borders
  border: "#DDE8E5",
  borderLight: "#EEF3F0",

  // Status
  success: "#059669",
  successBg: "#ECFDF5",
  successText: "#064E3B",
  error: "#DC2626",
  errorBg: "#FEF2F2",
  errorText: "#7F1D1D",
  warning: "#D97706",
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
    shadowColor: "#013E37",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: "#013E37",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: "#013E37",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// REUSABLE CARD BASE
export const CardBase = {
  backgroundColor: Colors.surface,
  borderRadius: Radius.lg,
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
