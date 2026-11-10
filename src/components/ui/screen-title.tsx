import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/ui/app-text";
import { Spacing } from "@/constants/theme";
import type { ScreenTitleProps } from "@/types/ui";

export const ScreenTitle = ({ title, subtitle }: ScreenTitleProps) => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: top + Spacing.md }]}>
            <AppText variant="title">{title}</AppText>
            {subtitle && (
                <AppText variant="small" color="textMuted">
                    {subtitle}
                </AppText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { paddingHorizontal: Spacing.lg, gap: 2 },
});
