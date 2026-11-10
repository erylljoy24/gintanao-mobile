import { StyleSheet, View } from "react-native";

import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { CardProps } from "@/types/ui";

export const Card = ({ children, style }: CardProps) => {
    const theme = useTheme();

    return (
        <View
            style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }, style]}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        gap: Spacing.md,
    },
});
