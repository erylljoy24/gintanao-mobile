import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Icon } from "@/components/ui/icon";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { ButtonProps } from "@/types/ui";

export const Button = ({
    label,
    onPress,
    variant = "primary",
    icon,
    disabled = false,
    loading = false,
    style,
}: ButtonProps) => {
    const theme = useTheme();
    const primary = variant === "primary";
    const foreground = primary ? theme.onPrimary : theme.text;

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: disabled || loading, busy: loading }}
            disabled={disabled || loading}
            onPress={onPress}
            style={({ pressed }) => [
                styles.base,
                primary
                    ? { backgroundColor: theme.primary }
                    : { borderColor: theme.border, borderWidth: 1, backgroundColor: theme.card },
                (pressed || disabled) && styles.dimmed,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={foreground} />
            ) : (
                <>
                    {icon && <Icon name={icon} size={16} color={foreground} />}
                    <AppText bold style={{ color: foreground }}>
                        {label}
                    </AppText>
                </>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    base: {
        minHeight: 46,
        paddingHorizontal: Spacing.lg,
        borderRadius: Radius.md,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: Spacing.sm,
    },
    dimmed: { opacity: 0.7 },
});
