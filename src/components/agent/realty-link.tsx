import { router } from "expo-router";
import { Pressable } from "react-native";

import { AppText } from "@/components/ui/app-text";
import type { RealtyLinkProps } from "@/types/agent";

export const RealtyLink = ({ realty }: RealtyLinkProps) => (
    <Pressable
        accessibilityRole="link"
        hitSlop={6}
        onPress={() => router.push(`/realty/${realty.slug}`)}
    >
        <AppText variant="small" color="textMuted">
            Under{" "}
            <AppText variant="small" bold color="primary">
                {realty.name}
            </AppText>
        </AppText>
    </Pressable>
);
