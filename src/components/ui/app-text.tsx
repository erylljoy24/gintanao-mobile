import { StyleSheet, Text } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import type { AppTextProps } from "@/types/ui";

export const AppText = ({ variant = "body", color, bold, style, ...rest }: AppTextProps) => {
    const theme = useTheme();
    const fallback = variant === "caption" ? "textMuted" : "text";

    return (
        <Text
            style={[
                { color: theme[color ?? fallback] },
                styles[variant],
                bold && styles.bold,
                style,
            ]}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    title: { fontSize: 28, lineHeight: 34, fontWeight: "700" },
    heading: { fontSize: 22, lineHeight: 28, fontWeight: "700" },
    subheading: { fontSize: 17, lineHeight: 22, fontWeight: "600" },
    body: { fontSize: 15, lineHeight: 22 },
    small: { fontSize: 13, lineHeight: 18 },
    caption: { fontSize: 12, lineHeight: 16 },
    bold: { fontWeight: "700" },
});
