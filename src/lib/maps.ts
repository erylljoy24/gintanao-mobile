import { Platform } from "react-native";

import type { GeoPoint } from "@/lib/api";

// An ungeocoded listing arrives with nulls, or (0, 0) once something coerced them to numbers.
export const isPlaced = (point: GeoPoint | null | undefined): point is GeoPoint =>
    point != null &&
    point.lat != null &&
    point.lng != null &&
    !(point.lat === 0 && point.lng === 0);

export const mapsUrl = ({ lat, lng }: GeoPoint, label: string): string =>
    Platform.OS === "ios"
        ? `http://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(label)}`
        : `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(label)})`;
