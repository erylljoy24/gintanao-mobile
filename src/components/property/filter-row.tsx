import { ScrollView, StyleSheet } from "react-native";

import { Chip } from "@/components/ui/chip";
import { Spacing } from "@/constants/theme";
import type { FilterRowProps } from "@/types/property";

export const FilterRow = <T extends string>({ options, value, onChange }: FilterRowProps<T>) => (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
    >
        {options.map((option) => (
            <Chip
                key={option.value}
                label={option.label}
                selected={option.value === value}
                onPress={() => onChange(option.value)}
            />
        ))}
    </ScrollView>
);

const styles = StyleSheet.create({
    row: { gap: Spacing.sm, paddingHorizontal: Spacing.lg },
});
