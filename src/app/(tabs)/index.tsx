import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CtaCard } from "@/components/home/cta-card";
import { HomeHero } from "@/components/home/home-hero";
import { FeaturedCarousel } from "@/components/property/featured-carousel";
import { PropertyCard } from "@/components/property/property-card";
import { ErrorView } from "@/components/ui/error-view";
import { LoadingView } from "@/components/ui/loading-view";
import { SectionHeader } from "@/components/ui/section-header";
import { Spacing } from "@/constants/theme";
import { useAsync } from "@/hooks/use-async";
import { useTheme } from "@/hooks/use-theme";
import { getFeaturedProperties, getProperties } from "@/lib/api";
import { agentLinks } from "@/lib/site";

const loadHome = async () => {
    const [featured, latest] = await Promise.all([
        getFeaturedProperties(5),
        getProperties({ status: "for-sale", sort: "newest", pageSize: 4 }),
    ]);
    return { featured, latest: latest.items };
};

const HomeScreen = () => {
    const theme = useTheme();
    const { top } = useSafeAreaInsets();
    const { data, error, loading, refreshing, refresh } = useAsync(loadHome, []);

    if (loading) return <LoadingView />;
    if (error && !data) return <ErrorView error={error} onRetry={refresh} />;

    return (
        <ScrollView
            style={{ backgroundColor: theme.background }}
            contentContainerStyle={[styles.content, { paddingTop: top }]}
            contentInsetAdjustmentBehavior="automatic"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
        >
            <HomeHero />

            {data && data.featured.length > 0 && (
                <View style={styles.section}>
                    <View style={styles.inset}>
                        <SectionHeader title="Featured homes" />
                    </View>
                    <FeaturedCarousel properties={data.featured} />
                </View>
            )}

            {data && data.latest.length > 0 && (
                <View style={[styles.section, styles.inset]}>
                    <SectionHeader
                        title="New on the market"
                        actionLabel="See all"
                        onAction={() => router.push("/properties")}
                    />
                    <View style={styles.list}>
                        {data.latest.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </View>
                </View>
            )}

            <View style={[styles.section, styles.inset, styles.list]}>
                <CtaCard
                    title="Work with a verified agent"
                    body="Every agent on Gintanao is PRC-verified, and every listing names who is selling it."
                    actionLabel="Browse agents"
                    onPress={() => router.push("/agents")}
                />
                <CtaCard
                    title="Are you an agent?"
                    body="List your properties and reach buyers looking right now."
                    actionLabel={agentLinks[0].title}
                    onPress={() => WebBrowser.openBrowserAsync(agentLinks[0].href)}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    content: { paddingBottom: Spacing.xxl },
    section: { marginTop: Spacing.xl },
    inset: { paddingHorizontal: Spacing.lg },
    list: { gap: Spacing.lg },
});

export default HomeScreen;
