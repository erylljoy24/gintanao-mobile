import type { Property, PropertyType } from "@/lib/api";
import { formatArea } from "@/lib/format";
import type { PropertyKind, SizeFact } from "@/types/property";

/**
 * Mirrors the backend's `categories.kind` (`App\Enums\PropertyKind`) and has to change with
 * it: a type filed as land there arrives with zeroed bedrooms, and a card that still reads
 * them prints "Studio" on a farm.
 */
const KINDS: Record<PropertyType, PropertyKind> = {
    house: "residential",
    apartment: "residential",
    condo: "residential",
    villa: "residential",
    townhouse: "residential",
    land: "land",
    "farm-lot": "land",
    commercial: "commercial",
    industrial: "commercial",
};

export const propertyKind = (type: PropertyType): PropertyKind => KINDS[type];

/** Bedrooms and bathrooms mean something: it is a home. */
export const hasRooms = (type: PropertyType): boolean => KINDS[type] === "residential";

/**
 * The size facts worth showing, largest claim first: a home leads with its living area, a
 * lot is only its lot, and a commercial listing may be either, the API sending a floor area
 * of 0 for "no building".
 */
export const sizeFacts = (property: Pick<Property, "type" | "area" | "lotSize">): SizeFact[] => {
    const lot = property.lotSize
        ? { label: "Lot size", value: formatArea(property.lotSize), lot: true }
        : null;

    switch (KINDS[property.type]) {
        case "residential":
            return [
                { label: "Living area", value: formatArea(property.area), lot: false },
                ...(lot ? [lot] : []),
            ];
        case "commercial":
            return [
                ...(property.area > 0
                    ? [{ label: "Floor area", value: formatArea(property.area), lot: false }]
                    : []),
                ...(lot ? [lot] : []),
            ];
        case "land":
            if (lot) return [lot];
            // Land entered before lot size was required carried it here instead.
            return property.area > 0
                ? [{ label: "Lot size", value: formatArea(property.area), lot: true }]
                : [];
    }
};

/**
 * The size facts a listing card has room for, which is why a home's lot size stays on the
 * listing page: bedrooms and bathrooms already take two of its three slots.
 */
export const cardSizeFacts = (property: Pick<Property, "type" | "area" | "lotSize">): SizeFact[] =>
    hasRooms(property.type) ? sizeFacts(property).slice(0, 1) : sizeFacts(property);
