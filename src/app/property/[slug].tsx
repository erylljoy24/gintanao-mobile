import { Stack, useLocalSearchParams } from "expo-router";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { FeatureList } from "@/components/property/feature-list";
import { ListedBy } from "@/components/property/listed-by";
import { LocationSection } from "@/components/property/location-section";
import { PropertyBadges } from "@/components/property/property-badges";
import { PropertyFacts } from "@/components/property/property-facts";
import { PropertyGallery } from "@/components/property/property-gallery";
import { ShareButton } from "@/components/property/share-button";
import { AppText } from "@/components/ui/app-text";
import { Card } from "@/components/ui/card";
import { EmptyView } from "@/components/ui/empty-view";
import { ErrorView } from "@/components/ui/error-view";
import { LoadingView } from "@/components/ui/loading-view";
import { Spacing } from "@/constants/theme";
import { useAsync } from "@/hooks/use-async";
import { useTheme } from "@/hooks/use-theme";
import { getAgentById, getPropertyBySlug } from "@/lib/api";
import { formatDate, formatPrice, shortLocation, typeLabel } from "@/lib/format";
import { propertyUrl } from "@/lib/site";
import type { SlugParams } from "@/types/routes";

const loadListing = async (slug: string) => {
    const property = await getPropertyBySlug(slug);
    // Null for an agent without a published profile: no "Listed by" card, not an error.
    const agent = property ? await getAgentById(property.agentId) : null;
    return { property, agent };
};

const PropertyScreen = () => {
    const theme = useTheme();
    const { slug } = useLocalSearchParams<SlugParams>();
    const { data, error, loading, refreshing, refresh } = useAsync(() => loadListing(slug), [slug]);

    if (loading) return <LoadingView />;
    if (error && !data) return <ErrorView error={error} onRetry={refresh} />;
    if (!data?.property) {
        return (
            <EmptyView
                title="Listing not found"
                body="It may have been sold or taken off the market."
            />
        );
    }

    const { property, agent } = data;
    const paragraphs = property.description.split(/\n\s*\n/).filter(Boolean);

    return (
        <>
            <Stack.Screen
                options={{
                    title: typeLabel(property.type),
                    headerRight: () => (
                        <ShareButton title={property.title} url={propertyUrl(property.slug)} />
                    ),
                }}
            />
            <ScrollView
                style={{ backgroundColor: theme.background }}
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
            >
                {property.images.length > 0 && <PropertyGallery images={property.images} />}

                <View style={styles.body}>
                    <View style={styles.summary}>
                        <PropertyBadges property={property} />
                        <AppText variant="title" color="primaryDark">
                            {formatPrice(property)}
                        </AppText>
                        <AppText variant="heading">{property.title}</AppText>
                        <AppText color="textMuted">{shortLocation(property.address)}</AppText>
                        <PropertyFacts property={property} />
                    </View>

                    {paragraphs.length > 0 && (
                        <Card>
                            <AppText variant="subheading">About this home</AppText>
                            {paragraphs.map((p, i) => (
                                <AppText key={i}>{p.trim()}</AppText>
                            ))}
                            <AppText variant="caption">
                                Listed {formatDate(property.createdAt)}
                                {property.yearBuilt ? ` · Built ${property.yearBuilt}` : ""}
                            </AppText>
                        </Card>
                    )}

                    {property.features.length > 0 && <FeatureList features={property.features} />}

                    <LocationSection property={property} />

                    {agent && <ListedBy agent={agent} property={property} />}
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    content: { paddingBottom: Spacing.xxl },
    body: { padding: Spacing.lg, gap: Spacing.lg },
    summary: { gap: Spacing.sm },
});

export default PropertyScreen;
