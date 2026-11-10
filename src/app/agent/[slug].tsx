import { Stack, useLocalSearchParams } from "expo-router";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { ContactChannels } from "@/components/agent/contact-channels";
import { RealtyLink } from "@/components/agent/realty-link";
import { VerifiedBadge } from "@/components/agent/verified-badge";
import { PropertyCard } from "@/components/property/property-card";
import { AppText } from "@/components/ui/app-text";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { EmptyView } from "@/components/ui/empty-view";
import { ErrorView } from "@/components/ui/error-view";
import { LoadingView } from "@/components/ui/loading-view";
import { SectionHeader } from "@/components/ui/section-header";
import { Spacing } from "@/constants/theme";
import { useAsync } from "@/hooks/use-async";
import { useTheme } from "@/hooks/use-theme";
import { getAgentBySlug, getProperties } from "@/lib/api";
import { plural } from "@/lib/format";
import type { SlugParams } from "@/types/routes";

const loadAgent = async (slug: string) => {
    const agent = await getAgentBySlug(slug);
    const listings = agent
        ? (await getProperties({ agentId: agent.id, status: "for-sale", pageSize: 20 })).items
        : [];
    return { agent, listings };
};

const AgentScreen = () => {
    const theme = useTheme();
    const { slug } = useLocalSearchParams<SlugParams>();
    const { data, error, loading, refreshing, refresh } = useAsync(() => loadAgent(slug), [slug]);

    if (loading) return <LoadingView />;
    if (error && !data) return <ErrorView error={error} onRetry={refresh} />;
    if (!data?.agent) {
        return <EmptyView title="Agent not found" body="This profile is not public." />;
    }

    const { agent, listings } = data;

    return (
        <>
            <Stack.Screen options={{ title: agent.name }} />
            <ScrollView
                style={{ backgroundColor: theme.background }}
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
            >
                <View style={styles.profile}>
                    <Avatar uri={agent.avatar} name={agent.name} size={104} />
                    <AppText variant="heading">{agent.name}</AppText>
                    <AppText color="textMuted">{agent.title}</AppText>
                    <VerifiedBadge role={agent.prcRole} />
                    {agent.realty && <RealtyLink realty={agent.realty} />}
                    <AppText variant="caption">
                        {plural(agent.listingsCount, "listing")}
                        {agent.yearsExperience > 0 &&
                            ` · ${plural(agent.yearsExperience, "year")} experience`}
                    </AppText>
                </View>

                <View style={styles.body}>
                    <Card>
                        <AppText variant="subheading">Contact {agent.name.split(" ")[0]}</AppText>
                        <ContactChannels agent={agent} />
                    </Card>

                    {agent.bio !== "" && (
                        <Card>
                            <AppText variant="subheading">About</AppText>
                            <AppText>{agent.bio}</AppText>
                            {agent.specialties.length > 0 && (
                                <AppText variant="small" color="textMuted">
                                    Specialties: {agent.specialties.join(", ")}
                                </AppText>
                            )}
                            {agent.languages.length > 0 && (
                                <AppText variant="small" color="textMuted">
                                    Speaks: {agent.languages.join(", ")}
                                </AppText>
                            )}
                        </Card>
                    )}

                    {listings.length > 0 && (
                        <View>
                            <SectionHeader title="Listings" />
                            <View style={styles.list}>
                                {listings.map((property) => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </View>
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
    body: { paddingHorizontal: Spacing.lg, gap: Spacing.lg },
    list: { gap: Spacing.lg },
});

export default AgentScreen;
