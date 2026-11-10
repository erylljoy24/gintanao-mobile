import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { PropertyBadges } from "@/components/property/property-badges";
import { PropertyFacts } from "@/components/property/property-facts";
import { AppText } from "@/components/ui/app-text";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { formatPrice, shortLocation } from "@/lib/format";
import type { PropertyCardProps } from "@/types/property";

export const PropertyCard = ({ property, style }: PropertyCardProps) => {
    const theme = useTheme();

    return (
        <Pressable
            accessibilityRole="link"
            accessibilityLabel={`${property.title}, ${formatPrice(property)}`}
            onPress={() => router.push(`/property/${property.slug}`)}
            style={({ pressed }) => [
                styles.card,
                { backgroundColor: theme.card, borderColor: theme.border },
                pressed && styles.pressed,
                style,
            ]}
        >
            <View>
                <Image
                    source={{ uri: property.images[0] }}
                    placeholder={property.blurDataUrl ? { uri: property.blurDataUrl } : undefined}
                    contentFit="cover"
                    transition={200}
                    style={[styles.image, { backgroundColor: theme.muted }]}
                />
                <View style={styles.badges}>
                    <PropertyBadges property={property} />
                </View>
            </View>
            <View style={styles.body}>
                <AppText variant="subheading" color="primaryDark">
                    {formatPrice(property)}
                </AppText>
                <AppText bold numberOfLines={1}>
                    {property.title}
                </AppText>
                <AppText variant="small" color="textMuted" numberOfLines={1}>
                    {shortLocation(property.address)}
                </AppText>
                <PropertyFacts property={property} compact />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: { borderWidth: 1, borderRadius: Radius.lg, overflow: "hidden" },
    pressed: { opacity: 0.85 },
    image: { width: "100%", aspectRatio: 3 / 2 },
    badges: { position: "absolute", top: Spacing.sm, left: Spacing.sm },
    body: { padding: Spacing.md, gap: 4 },
});
