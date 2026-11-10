import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { BadgeProps } from "@/types/ui";

export const Badge = ({ label, tone }: BadgeProps) => {
    const theme = useTheme();
    const backgrounds = {
        primary: theme.primary,
        dark: "rgba(0, 0, 0, 0.7)",
        success: theme.success,
        muted: theme.muted,
    };

    return (
        <View style={[styles.badge, { backgroundColor: backgrounds[tone] }]}>
            <AppText
                variant="caption"
                bold
                style={{ color: tone === "muted" ? theme.text : "#ffffff" }}
            >
                {label}
            </AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: 3,
        borderRadius: Radius.sm,
        alignSelf: "flex-start",
    },
});
