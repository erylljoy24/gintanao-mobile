import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Spacing } from "@/constants/theme";
import type { EmptyViewProps } from "@/types/ui";

export const EmptyView = ({ title, body, children }: EmptyViewProps) => (
    <View style={styles.container}>
        <AppText variant="subheading" style={styles.center}>
            {title}
        </AppText>
        {body && (
            <AppText variant="small" color="textMuted" style={styles.center}>
                {body}
            </AppText>
        )}
        {children}
    </View>
);

const styles = StyleSheet.create({
    container: { alignItems: "center", padding: Spacing.xxl, gap: Spacing.sm },
    center: { textAlign: "center" },
});
