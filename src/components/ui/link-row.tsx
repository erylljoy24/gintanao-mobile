import { Pressable, StyleSheet } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Icon } from "@/components/ui/icon";
import { Icons } from "@/constants/icons";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { LinkRowProps } from "@/types/ui";

export const LinkRow = ({ label, icon, onPress }: LinkRowProps) => {
    const theme = useTheme();

    return (
        <Pressable
            accessibilityRole="link"
            onPress={onPress}
            style={({ pressed }) => [
                styles.row,
                { borderBottomColor: theme.border },
                pressed && { backgroundColor: theme.muted },
            ]}
        >
            <Icon name={icon} color={theme.primary} />
            <AppText style={styles.label}>{label}</AppText>
            <Icon name={Icons.chevron} size={14} color={theme.textMuted} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.md,
        paddingVertical: Spacing.md + 2,
        paddingHorizontal: Spacing.lg,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    label: { flex: 1 },
});
