import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { TextField } from "@/components/ui/text-field";
import { BRAND_DARK, Radius, Spacing } from "@/constants/theme";
import { siteConfig } from "@/lib/site";

export const HomeHero = () => {
    const [q, setQ] = useState("");

    const search = () =>
        router.push({ pathname: "/properties", params: q.trim() ? { q: q.trim() } : {} });

    return (
        <View style={[styles.hero, { backgroundColor: BRAND_DARK }]}>
            <AppText variant="title" style={styles.light}>
                {siteConfig.tagline}
            </AppText>
            <AppText style={styles.lightMuted}>Homes for sale from PRC-verified agents.</AppText>
            <TextField
                value={q}
                onChangeText={setQ}
                onSubmitEditing={search}
                placeholder="Search a city, barangay or keyword"
                returnKeyType="search"
                autoCorrect={false}
                accessibilityLabel="Search listings"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    hero: {
        margin: Spacing.lg,
        padding: Spacing.xl,
        borderRadius: Radius.lg,
        gap: Spacing.md,
    },
    light: { color: "#ffffff" },
    lightMuted: { color: "rgba(255, 255, 255, 0.85)" },
});
