import * as WebBrowser from "expo-web-browser";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

import { AgentCard } from "@/components/agent/agent-card";
import { Button } from "@/components/ui/button";
import { EmptyView } from "@/components/ui/empty-view";
import { ErrorView } from "@/components/ui/error-view";
import { LoadingView } from "@/components/ui/loading-view";
import { ScreenTitle } from "@/components/ui/screen-title";
import { Spacing } from "@/constants/theme";
import { useAsync } from "@/hooks/use-async";
import { useTheme } from "@/hooks/use-theme";
import { getAgents } from "@/lib/api";
import { agentLinks } from "@/lib/site";

const AgentsScreen = () => {
    const theme = useTheme();
    const { data, error, loading, refreshing, refresh } = useAsync(getAgents, []);

    if (loading) return <LoadingView />;
    if (error && !data) return <ErrorView error={error} onRetry={refresh} />;

    return (
        <FlatList
            style={{ backgroundColor: theme.background }}
            contentInsetAdjustmentBehavior="automatic"
            data={data}
            keyExtractor={(a) => a.id}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <AgentCard agent={item} />
                </View>
            )}
            contentContainerStyle={styles.content}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
            ListHeaderComponent={
                <View style={styles.header}>
                    <ScreenTitle
                        title="Agents"
                        subtitle="Every agent here is verified with the PRC."
                    />
                </View>
            }
            ListEmptyComponent={
                <EmptyView title="No agents yet" body="Agents appear here once verified.">
                    <Button
                        label={agentLinks[0].title}
                        variant="outline"
                        onPress={() => WebBrowser.openBrowserAsync(agentLinks[0].href)}
                    />
                </EmptyView>
            }
        />
    );
};

const styles = StyleSheet.create({
    content: { paddingBottom: Spacing.xxl },
    header: { marginBottom: Spacing.lg },
    item: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
});

export default AgentsScreen;
