import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Icons } from "@/constants/icons";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { ErrorViewProps } from "@/types/ui";

export const ErrorView = ({ error, onRetry }: ErrorViewProps) => {
    const theme = useTheme();
    const detail = error instanceof Error ? error.message : String(error);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Icon name={Icons.error} size={36} color={theme.danger} />
            <AppText variant="subheading">Couldn&apos;t reach Gintanao</AppText>
            <AppText variant="small" color="textMuted" style={styles.center}>
                Check your connection and try again.
            </AppText>
            {__DEV__ && (
                <AppText variant="caption" style={styles.center}>
                    {detail}
                </AppText>
            )}
            <Button label="Try again" onPress={onRetry} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: Spacing.xxl,
        gap: Spacing.md,
    },
    center: { textAlign: "center" },
});
