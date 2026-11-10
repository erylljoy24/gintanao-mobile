// The web portal's design tokens (src/app/globals.css there), converted from oklch to hex.
export const Colors = {
    light: {
        text: "#2b2d42",
        textMuted: "#737373",
        background: "#ffffff",
        card: "#ffffff",
        muted: "#f5f5f5",
        border: "#e5e5e5",
        primary: "#4a90e2",
        primaryDark: "#1f5fa2",
        onPrimary: "#fafafa",
        danger: "#e7000b",
        success: "#16a34a",
        overlay: "rgba(0, 0, 0, 0.55)",
    },
    dark: {
        text: "#fafafa",
        textMuted: "#a1a1a1",
        background: "#0a0a0a",
        card: "#171717",
        muted: "#262626",
        border: "#2e2e2e",
        primary: "#4a90e2",
        primaryDark: "#7fb2ee",
        onPrimary: "#fafafa",
        danger: "#ff6467",
        success: "#4ade80",
        overlay: "rgba(0, 0, 0, 0.55)",
    },
} as const;

/** The hero band keeps the brand blue in both modes, since its text is always white. */
export const BRAND_DARK = "#1f5fa2";

export type ThemeColors = (typeof Colors)["light"] | (typeof Colors)["dark"];
export type ThemeColor = keyof typeof Colors.light;

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
} as const;

export const Radius = {
    sm: 6,
    md: 10,
    lg: 16,
    full: 999,
} as const;
