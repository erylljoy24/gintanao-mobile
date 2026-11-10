import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Icon } from "@/components/ui/icon";
import { useTheme } from "@/hooks/use-theme";
import type { FactProps } from "@/types/property";

export const Fact = ({ icon, label }: FactProps) => {
    const theme = useTheme();

    return (
        <View style={styles.fact}>
            <Icon name={icon} size={15} color={theme.textMuted} />
            <AppText variant="small" color="textMuted">
                {label}
            </AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    fact: { flexDirection: "row", alignItems: "center", gap: 5 },
});
