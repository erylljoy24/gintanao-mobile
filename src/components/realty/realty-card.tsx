import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { RealtyLogo } from "@/components/realty/realty-logo";
import { AppText } from "@/components/ui/app-text";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { plural } from "@/lib/format";
import type { RealtyCardProps } from "@/types/realty";

export const RealtyCard = ({ realty }: RealtyCardProps) => {
    const theme = useTheme();

    return (
        <Pressable
            accessibilityRole="link"
            accessibilityLabel={realty.name}
            onPress={() => router.push(`/realty/${realty.slug}`)}
            style={({ pressed }) => [
                styles.card,
                { backgroundColor: theme.card, borderColor: theme.border },
                pressed && styles.pressed,
            ]}
        >
            <RealtyLogo realty={realty} size={56} />
            <View style={styles.body}>
                <AppText variant="subheading" numberOfLines={2}>
                    {realty.name}
                </AppText>
                {realty.city && (
                    <AppText variant="small" color="textMuted">
                        {realty.city.name}
                    </AppText>
                )}
                <AppText variant="caption">
                    {plural(realty.agentsCount, "agent")} ·{" "}
                    {plural(realty.listingsCount, "listing")}
                </AppText>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        gap: Spacing.md,
        padding: Spacing.md,
        borderWidth: 1,
        borderRadius: Radius.lg,
        alignItems: "center",
    },
    pressed: { opacity: 0.85 },
    body: { flex: 1, gap: 2 },
});
