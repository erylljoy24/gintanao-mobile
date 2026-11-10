import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { FeatureListProps } from "@/types/property";

export const FeatureList = ({ features }: FeatureListProps) => (
    <Card>
        <AppText variant="subheading">Features</AppText>
        <View style={styles.row}>
            {features.map((feature) => (
                <Badge key={feature} label={feature} tone="muted" />
            ))}
        </View>
    </Card>
);

const styles = StyleSheet.create({
    row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
});
