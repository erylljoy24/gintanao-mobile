import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Icon } from "@/components/ui/icon";
import { Icons } from "@/constants/icons";
import { useTheme } from "@/hooks/use-theme";
import { prcTitle } from "@/lib/format";
import type { VerifiedBadgeProps } from "@/types/agent";

export const VerifiedBadge = ({ role }: VerifiedBadgeProps) => {
    const theme = useTheme();

    return (
        <View style={styles.row}>
            <Icon name={Icons.verified} size={14} color={theme.primary} />
            <AppText variant="caption" bold color="primary">
                {prcTitle(role)}
            </AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    row: { flexDirection: "row", alignItems: "center", gap: 4 },
});
