import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { FilterRow } from "@/components/property/filter-row";
import { TextField } from "@/components/ui/text-field";
import { Spacing } from "@/constants/theme";
import type { PropertyType } from "@/lib/api";
import { typeLabel } from "@/lib/format";
import type { ListingFilters, PropertyFiltersProps } from "@/types/property";

const ANY_TYPE = "any";

const TYPES: PropertyType[] = [
    "house",
    "condo",
    "townhouse",
    "apartment",
    "villa",
    "land",
    "farm-lot",
    "commercial",
    "industrial",
];

const TYPE_OPTIONS = [
    { value: ANY_TYPE, label: "Any type" },
    ...TYPES.map((value) => ({ value, label: typeLabel(value) })),
];

const STATUS_OPTIONS: { value: ListingFilters["status"]; label: string }[] = [
    { value: "for-sale", label: "For sale" },
    { value: "sold", label: "Sold" },
];

const SORT_OPTIONS: { value: ListingFilters["sort"]; label: string }[] = [
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
];

export const PropertyFilters = ({ filters, onChange }: PropertyFiltersProps) => {
    // The search box is typed into freely and only applied on submit, so each keystroke is not a request.
    const [draft, setDraft] = useState(filters.q);

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextField
                    value={draft}
                    onChangeText={setDraft}
                    onSubmitEditing={() => onChange({ ...filters, q: draft.trim() })}
                    placeholder="Search a city, barangay or keyword"
                    returnKeyType="search"
                    clearButtonMode="while-editing"
                    autoCorrect={false}
                    accessibilityLabel="Search listings"
                />
            </View>
            <FilterRow
                options={STATUS_OPTIONS}
                value={filters.status}
                onChange={(status) => onChange({ ...filters, status })}
            />
            <FilterRow
                options={TYPE_OPTIONS}
                value={filters.type ?? ANY_TYPE}
                onChange={(type) =>
                    onChange({
                        ...filters,
                        type: type === ANY_TYPE ? undefined : (type as PropertyType),
                    })
                }
            />
            <FilterRow
                options={SORT_OPTIONS}
                value={filters.sort}
                onChange={(sort) => onChange({ ...filters, sort })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { gap: Spacing.sm, paddingVertical: Spacing.md },
    search: { paddingHorizontal: Spacing.lg },
});
