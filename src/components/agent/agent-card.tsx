import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { RealtyLink } from "@/components/agent/realty-link";
import { VerifiedBadge } from "@/components/agent/verified-badge";
import { AppText } from "@/components/ui/app-text";
import { Avatar } from "@/components/ui/avatar";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { AgentCardProps } from "@/types/agent";

export const AgentCard = ({ agent }: AgentCardProps) => {
    const theme = useTheme();

    return (
        <Pressable
            accessibilityRole="link"
            accessibilityLabel={agent.name}
            onPress={() => router.push(`/agent/${agent.slug}`)}
            style={({ pressed }) => [
                styles.card,
                { backgroundColor: theme.card, borderColor: theme.border },
                pressed && styles.pressed,
            ]}
        >
            <Avatar uri={agent.avatar} name={agent.name} size={64} />
            <View style={styles.body}>
                <AppText variant="subheading" numberOfLines={1}>
                    {agent.name}
                </AppText>
                <AppText variant="small" color="textMuted" numberOfLines={1}>
                    {agent.title}
                </AppText>
                <VerifiedBadge role={agent.prcRole} />
                {agent.realty && <RealtyLink realty={agent.realty} />}
                <AppText variant="caption">
                    {agent.listingsCount} {agent.listingsCount === 1 ? "listing" : "listings"}
                    {agent.yearsExperience > 0 && ` · ${agent.yearsExperience} yrs experience`}
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
