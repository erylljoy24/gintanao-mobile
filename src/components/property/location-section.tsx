import { Linking } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icons } from "@/constants/icons";
import { fullAddress } from "@/lib/format";
import { isPlaced, mapsUrl } from "@/lib/maps";
import type { LocationSectionProps } from "@/types/property";

export const LocationSection = ({ property }: LocationSectionProps) => {
    const exact = isPlaced(property.location) ? property.location : null;
    const approximate = isPlaced(property.approximateLocation)
        ? property.approximateLocation
        : null;
    const point = exact ?? approximate;

    return (
        <Card>
            <AppText variant="subheading">Location</AppText>
            <AppText>{fullAddress(property)}</AppText>
            {/* Same rule as the web: never present a neighborhood centre as the address. */}
            {!exact && approximate && (
                <AppText variant="small" color="textMuted">
                    Approximate area — the agent has not pinned the exact spot.
                </AppText>
            )}
            {point && (
                <Button
                    label={exact ? "Open in Maps" : "View area in Maps"}
                    icon={Icons.map}
                    variant="outline"
                    onPress={() => Linking.openURL(mapsUrl(point, property.title))}
                />
            )}
        </Card>
    );
};
