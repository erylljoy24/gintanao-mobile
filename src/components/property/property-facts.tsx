import { StyleSheet, View } from "react-native";

import { Fact } from "@/components/property/fact";
import { Icons } from "@/constants/icons";
import { cardSizeFacts, hasRooms, sizeFacts } from "@/lib/property-kind";
import type { PropertyFactsProps } from "@/types/property";

export const PropertyFacts = ({ property, compact = false }: PropertyFactsProps) => {
    const rooms = hasRooms(property.type);
    const sizes = compact ? cardSizeFacts(property) : sizeFacts(property);

    return (
        <View style={styles.row}>
            {rooms && (
                <Fact
                    icon={Icons.bed}
                    label={property.bedrooms === 0 ? "Studio" : `${property.bedrooms} bd`}
                />
            )}
            {rooms && <Fact icon={Icons.bath} label={`${property.bathrooms} ba`} />}
            {sizes.map((fact) => (
                <Fact
                    key={fact.label}
                    icon={fact.lot ? Icons.lot : Icons.area}
                    label={compact ? fact.value : `${fact.value} ${fact.label.toLowerCase()}`}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    row: { flexDirection: "row", flexWrap: "wrap", columnGap: 14, rowGap: 6 },
});
