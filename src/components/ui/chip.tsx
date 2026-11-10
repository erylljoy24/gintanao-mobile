import { Pressable, StyleSheet } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { ChipProps } from "@/types/ui";

export const Chip = ({ label, selected, onPress }: ChipProps) => {
    const theme = useTheme();

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={onPress}
            style={[
                styles.chip,
                selected
                    ? { backgroundColor: theme.primary, borderColor: theme.primary }
                    : { backgroundColor: theme.card, borderColor: theme.border },
            ]}
        >
            <AppText
                variant="small"
                bold
                style={{ color: selected ? theme.onPrimary : theme.text }}
            >
                {label}
            </AppText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 2,
        borderRadius: Radius.full,
        borderWidth: 1,
    },
});
