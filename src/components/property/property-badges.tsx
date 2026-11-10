import { StyleSheet, View } from "react-native";

import { Badge } from "@/components/ui/badge";
import { statusLabel } from "@/lib/format";
import { isNewListing, isSold } from "@/lib/listing-flags";
import type { PropertyBadgesProps } from "@/types/property";

export const PropertyBadges = ({ property }: PropertyBadgesProps) => (
    <View style={styles.row}>
        <Badge label={statusLabel(property.status)} tone={isSold(property) ? "dark" : "primary"} />
        {property.featured && !isSold(property) && <Badge label="Featured" tone="dark" />}
        {isNewListing(property) && !isSold(property) && <Badge label="New" tone="success" />}
    </View>
);

const styles = StyleSheet.create({
    row: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
});
