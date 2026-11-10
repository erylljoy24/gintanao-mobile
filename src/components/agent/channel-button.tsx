import { Pressable, StyleSheet } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Icon } from "@/components/ui/icon";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { ChannelButtonProps } from "@/types/agent";

export const ChannelButton = ({ label, icon, onPress }: ChannelButtonProps) => {
    const theme = useTheme();

    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                { borderColor: theme.border, backgroundColor: theme.card },
                pressed && { backgroundColor: theme.muted },
            ]}
        >
            <Icon name={icon} size={20} color={theme.primary} />
            <AppText variant="caption" bold color="text">
                {label}
            </AppText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        flexBasis: "30%",
        flexGrow: 1,
        alignItems: "center",
        gap: Spacing.xs,
        paddingVertical: Spacing.md,
        borderWidth: 1,
        borderRadius: Radius.md,
    },
});
