import { Stack, useLocalSearchParams } from "expo-router";
import { Linking, RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { AgentCard } from "@/components/agent/agent-card";
import { PropertyCard } from "@/components/property/property-card";
import { RealtyLogo } from "@/components/realty/realty-logo";
import { AppText } from "@/components/ui/app-text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyView } from "@/components/ui/empty-view";
import { ErrorView } from "@/components/ui/error-view";
import { LoadingView } from "@/components/ui/loading-view";
import { SectionHeader } from "@/components/ui/section-header";
import { Icons } from "@/constants/icons";
import { Spacing } from "@/constants/theme";
import { useAsync } from "@/hooks/use-async";
import { useTheme } from "@/hooks/use-theme";
import { getRealtyBySlug, getRealtyListings } from "@/lib/api";
import { messengerHref, telHref } from "@/lib/contact";
import { plural } from "@/lib/format";
import type { SlugParams } from "@/types/routes";

const LISTINGS_SHOWN = 20;

const loadRealty = async (slug: string) => {
    const realty = await getRealtyBySlug(slug);
    // Fetched by the realty's current slug, since `slug` may be a former one.
    const listings = realty ? await getRealtyListings(realty.slug, LISTINGS_SHOWN) : null;
    return { realty, listings };
};

const RealtyScreen = () => {
    const theme = useTheme();
    const { slug } = useLocalSearchParams<SlugParams>();
    const { data, error, loading, refreshing, refresh } = useAsync(() => loadRealty(slug), [slug]);

    if (loading) return <LoadingView />;
    if (error && !data) return <ErrorView error={error} onRetry={refresh} />;
    if (!data?.realty) {
        return <EmptyView title="Realty not found" body="It may no longer be active." />;
    }

    const { realty, listings } = data;
    const tel = telHref(realty.phone);
    const messenger = messengerHref(realty.messenger ?? undefined);

    return (
        <>
            <Stack.Screen options={{ title: realty.name }} />
            <ScrollView
                style={{ backgroundColor: theme.background }}
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
            >
                <View style={styles.profile}>
                    <RealtyLogo realty={realty} size={88} />
                    <AppText variant="heading" style={styles.center}>
                        {realty.name}
                    </AppText>
                    {realty.city && <AppText color="textMuted">{realty.city.name}</AppText>}
                    <AppText variant="caption">
                        {plural(realty.agentsCount, "agent")} ·{" "}
                        {plural(realty.listingsCount, "listing")}
                    </AppText>
                </View>

                <View style={styles.body}>
                    <Card>
                        {realty.about !== "" && <AppText>{realty.about}</AppText>}
                        {realty.address !== "" && (
                            <AppText variant="small" color="textMuted">
                                {realty.address}
                            </AppText>
                        )}
                        {realty.principalBroker && (
                            <AppText variant="small" color="textMuted">
                                Principal broker: {realty.principalBroker.name}
                            </AppText>
                        )}
                        <View style={styles.actions}>
                            {tel && (
                                <Button
                                    label="Call"
                                    icon={Icons.call}
                                    variant="outline"
                                    style={styles.action}
                                    onPress={() => Linking.openURL(tel)}
                                />
                            )}
                            {realty.email !== "" && (
                                <Button
                                    label="Email"
                                    icon={Icons.mail}
                                    variant="outline"
                                    style={styles.action}
                                    onPress={() => Linking.openURL(`mailto:${realty.email}`)}
                                />
                            )}
                            {messenger && (
                                <Button
                                    label="Messenger"
                                    icon={Icons.chat}
                                    variant="outline"
                                    style={styles.action}
                                    onPress={() => Linking.openURL(messenger)}
                                />
                            )}
                        </View>
                    </Card>

                    {realty.agents && realty.agents.length > 0 && (
                        <View>
                            <SectionHeader title="Agents" />
                            <View style={styles.list}>
                                {realty.agents.map((agent) => (
                                    <AgentCard key={agent.id} agent={agent} />
                                ))}
                            </View>
                        </View>
                    )}

                    {listings && listings.items.length > 0 && (
                        <View>
                            <SectionHeader title="Listings" />
                            <View style={styles.list}>
                                {listings.items.map((property) => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </View>
                            {listings.total > listings.items.length && (
                                <AppText variant="small" color="textMuted" style={styles.more}>
                                    Showing {listings.items.length} of {listings.total} listings.
                                </AppText>
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    content: { paddingBottom: Spacing.xxl },
    profile: { alignItems: "center", gap: Spacing.xs, padding: Spacing.xl },
    center: { textAlign: "center" },
    body: { paddingHorizontal: Spacing.lg, gap: Spacing.xl },
    actions: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.sm },
    action: { flexGrow: 1 },
    list: { gap: Spacing.md },
    more: { marginTop: Spacing.md, textAlign: "center" },
});

export default RealtyScreen;
