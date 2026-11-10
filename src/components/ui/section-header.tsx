import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Spacing } from "@/constants/theme";
import type { SectionHeaderProps } from "@/types/ui";

export const SectionHeader = ({ title, actionLabel, onAction }: SectionHeaderProps) => (
    <View style={styles.row}>
        <AppText variant="heading">{title}</AppText>
        {actionLabel && onAction && (
            <Pressable accessibilityRole="link" onPress={onAction} hitSlop={8}>
                <AppText variant="small" bold color="primary">
                    {actionLabel}
                </AppText>
            </Pressable>
        )}
    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: Spacing.md,
    },
});
