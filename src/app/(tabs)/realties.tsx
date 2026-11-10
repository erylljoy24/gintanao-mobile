import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from "react-native";

import { RealtyCard } from "@/components/realty/realty-card";
import { AppText } from "@/components/ui/app-text";
import { Button } from "@/components/ui/button";
import { EmptyView } from "@/components/ui/empty-view";
import { ErrorView } from "@/components/ui/error-view";
import { ScreenTitle } from "@/components/ui/screen-title";
import { TextField } from "@/components/ui/text-field";
import { Spacing } from "@/constants/theme";
import { useAsync } from "@/hooks/use-async";
import { useTheme } from "@/hooks/use-theme";
import { getRealties } from "@/lib/api";
import { agentLinks } from "@/lib/site";

const PAGE_SIZE = 100;

const RealtiesScreen = () => {
    const theme = useTheme();
    const [draft, setDraft] = useState("");
    const [search, setSearch] = useState("");
    const { data, error, loading, refreshing, refresh } = useAsync(
        () => getRealties({ search: search || undefined, sort: "name", pageSize: PAGE_SIZE }),
        [search],
    );

    return (
        <FlatList
            style={{ backgroundColor: theme.background }}
            contentInsetAdjustmentBehavior="automatic"
            keyboardShouldPersistTaps="handled"
            data={data?.items ?? []}
            keyExtractor={(r) => r.id}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <RealtyCard realty={item} />
                </View>
            )}
            contentContainerStyle={styles.content}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
            ListHeaderComponent={
                <View style={styles.header}>
                    <ScreenTitle
                        title="Realties"
                        subtitle="Verified realties in the Philippines."
                    />
                    <View style={styles.inset}>
                        <TextField
                            value={draft}
                            onChangeText={setDraft}
                            onSubmitEditing={() => setSearch(draft.trim())}
                            placeholder="Search by name"
                            returnKeyType="search"
                            clearButtonMode="while-editing"
                            autoCorrect={false}
                            accessibilityLabel="Search realties"
                        />
                    </View>
                    {data && data.total > data.items.length && (
                        <AppText variant="small" color="textMuted" style={styles.inset}>
                            Showing {data.items.length} of {data.total} — search to narrow it down.
                        </AppText>
                    )}
                </View>
            }
            ListEmptyComponent={
                loading ? (
                    <ActivityIndicator style={styles.spinner} color={theme.primary} />
                ) : error ? (
                    <ErrorView error={error} onRetry={refresh} />
                ) : (
                    <EmptyView
                        title={search ? "No realties match" : "No realties yet"}
                        body={search ? "Try another name." : undefined}
                    >
                        {!search && (
                            <Button
                                label={agentLinks[1].title}
                                variant="outline"
                                onPress={() => WebBrowser.openBrowserAsync(agentLinks[1].href)}
                            />
                        )}
                    </EmptyView>
                )
            }
        />
    );
};

const styles = StyleSheet.create({
    content: { paddingBottom: Spacing.xxl },
    header: { gap: Spacing.md, marginBottom: Spacing.lg },
    inset: { paddingHorizontal: Spacing.lg },
    item: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
    spinner: { marginVertical: Spacing.xl },
});

export default RealtiesScreen;
