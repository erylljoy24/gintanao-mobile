import { FlatList, StyleSheet, useWindowDimensions } from "react-native";

import { PropertyCard } from "@/components/property/property-card";
import { Spacing } from "@/constants/theme";
import type { FeaturedCarouselProps } from "@/types/property";

export const FeaturedCarousel = ({ properties }: FeaturedCarouselProps) => {
    const { width } = useWindowDimensions();
    // Most of a card, so the next one peeks in and the row reads as scrollable.
    const cardWidth = Math.round(width * 0.8);

    return (
        <FlatList
            data={properties}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth + Spacing.md}
            decelerationRate="fast"
            keyExtractor={(p) => p.id}
            contentContainerStyle={styles.row}
            renderItem={({ item }) => <PropertyCard property={item} style={{ width: cardWidth }} />}
        />
    );
};

const styles = StyleSheet.create({
    row: { gap: Spacing.md, paddingHorizontal: Spacing.lg },
});
