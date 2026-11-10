import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from "react-native";

import { PropertyCard } from "@/components/property/property-card";
import { PropertyFilters } from "@/components/property/property-filters";
import { AppText } from "@/components/ui/app-text";
import { EmptyView } from "@/components/ui/empty-view";
import { ErrorView } from "@/components/ui/error-view";
import { ScreenTitle } from "@/components/ui/screen-title";
import { Spacing } from "@/constants/theme";
import { usePropertySearch } from "@/hooks/use-property-search";
import { useTheme } from "@/hooks/use-theme";
import { formatNumber } from "@/lib/format";
import type { ListingFilters } from "@/types/property";
import type { PropertiesParams } from "@/types/routes";

const PropertiesScreen = () => {
    const theme = useTheme();
    const { q = "" } = useLocalSearchParams<PropertiesParams>();
    const [filters, setFilters] = useState<ListingFilters>({
        q,
        status: "for-sale",
        sort: "newest",
    });

    // A search from the home tab arrives as a new `q` while this tab is already mounted.
    const [seenQ, setSeenQ] = useState(q);
    if (q !== seenQ) {
        setSeenQ(q);
        setFilters((f) => ({ ...f, q }));
    }

    const search = usePropertySearch({
        q: filters.q || undefined,
        status: filters.status,
        type: filters.type,
        sort: filters.sort,
    });

    return (
        <FlatList
            style={{ backgroundColor: theme.background }}
            contentInsetAdjustmentBehavior="automatic"
            data={search.items}
            keyExtractor={(p) => p.id}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <PropertyCard property={item} />
                </View>
            )}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            onEndReached={search.loadMore}
            onEndReachedThreshold={0.5}
            refreshControl={
                <RefreshControl refreshing={search.refreshing} onRefresh={search.refresh} />
            }
            ListHeaderComponent={
                <View style={styles.header}>
                    <ScreenTitle title="Properties" />
                    <PropertyFilters key={filters.q} filters={filters} onChange={setFilters} />
                    {search.total !== undefined && (
                        <AppText variant="small" color="textMuted" style={styles.count}>
                            {formatNumber(search.total)} {search.total === 1 ? "home" : "homes"}{" "}
                            found
                        </AppText>
                    )}
                </View>
            }
            ListEmptyComponent={
                search.loading ? (
                    <ActivityIndicator style={styles.spinner} color={theme.primary} />
                ) : search.error ? (
                    <ErrorView error={search.error} onRetry={search.refresh} />
                ) : (
                    <EmptyView
                        title="No homes match"
                        body="Try a different place, or widen the filters."
                    />
                )
            }
            ListFooterComponent={
                search.loadingMore ? (
                    <ActivityIndicator style={styles.spinner} color={theme.primary} />
                ) : undefined
            }
        />
    );
};

const styles = StyleSheet.create({
    content: { paddingBottom: Spacing.xxl },
    header: { marginBottom: Spacing.sm },
    count: { paddingHorizontal: Spacing.lg },
    item: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.lg },
    spinner: { marginVertical: Spacing.xl },
});

export default PropertiesScreen;
