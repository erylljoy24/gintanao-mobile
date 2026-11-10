import type { StyleProp, ViewStyle } from "react-native";

import type { Agent, Property, PropertyQuery, PropertyType } from "@/lib/api";
import type { IconName } from "@/types/ui";

export type PropertyKind = "residential" | "commercial" | "land";

/** One size line on a listing, e.g. "Lot size: 3 ha", where `lot` picks the icon. */
export interface SizeFact {
    label: string;
    value: string;
    lot: boolean;
}

/** What the listings screen lets a buyer change; sale-only, so rentals are never offered. */
export interface ListingFilters {
    q: string;
    status: "for-sale" | "sold";
    type?: PropertyType;
    sort: NonNullable<PropertyQuery["sort"]>;
}

export interface PropertyCardProps {
    property: Property;
    style?: StyleProp<ViewStyle>;
}

export interface PropertyBadgesProps {
    property: Property;
}

export interface PropertyFactsProps {
    property: Property;
    /** Card layout shows one size fact; the listing page shows all of them. */
    compact?: boolean;
}

export interface FactProps {
    icon: IconName;
    label: string;
}

export interface PropertyGalleryProps {
    images: string[];
}

export interface PropertyFiltersProps {
    filters: ListingFilters;
    onChange: (filters: ListingFilters) => void;
}

export interface FilterRowProps<T extends string> {
    options: { value: T; label: string }[];
    value: T | undefined;
    onChange: (value: T) => void;
}

export interface LocationSectionProps {
    property: Property;
}

export interface FeatureListProps {
    features: string[];
}

export interface FeaturedCarouselProps {
    properties: Property[];
}

export interface ListedByProps {
    agent: Agent;
    property: Property;
}

export interface ShareButtonProps {
    title: string;
    url: string;
}
