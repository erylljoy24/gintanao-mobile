import type { Address, PrcRole, Property } from "@/lib/api";

type PricedListing = Pick<Property, "price" | "currency" | "status" | "rentPeriod">;

/** Format a price, compacting sale prices and annotating rentals. */
export const formatPrice = (listing: PricedListing): string => {
    const { price, currency, status, rentPeriod } = listing;
    const base = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(price);

    if (status === "for-rent" && rentPeriod) {
        return `${base}/${rentPeriod === "month" ? "mo" : "wk"}`;
    }
    return base;
};

const COMPACT_SCALES: [number, string][] = [
    [1_000_000_000, "B"],
    [1_000_000, "M"],
    [1_000, "K"],
];

/** Compact peso amount for tight spaces, e.g. ₱4.3M; by hand because Hermes lacks compact notation. */
export const formatCompactPrice = (amount: number): string => {
    for (const [size, suffix] of COMPACT_SCALES) {
        if (amount >= size) return `₱${Math.round((amount / size) * 10) / 10}${suffix}`;
    }
    return `₱${formatNumber(amount)}`;
};

export const formatNumber = (n: number): string => {
    return new Intl.NumberFormat("en-US").format(n);
};

const SQM_PER_HECTARE = 10_000;

/**
 * Floor or lot area for display, e.g. "68 sqm", switching to hectares from a hectare up
 * because that is how farm land is quoted.
 */
export const formatArea = (sqm: number): string => {
    if (sqm >= SQM_PER_HECTARE) {
        const hectares = Math.round((sqm / SQM_PER_HECTARE) * 10) / 10;
        return `${formatNumber(hectares)} ha`;
    }
    return `${formatNumber(Math.round(sqm))} sqm`;
};

/**
 * One-line location for cards, e.g. "Bajada, Davao City", the barangay being how buyers
 * here place a home, with city and province as the fallback.
 */
export const shortLocation = (address: Address): string => {
    return address.neighborhood
        ? `${address.neighborhood}, ${address.city}`
        : `${address.city}, ${address.state}`;
};

const STATUS_LABELS: Record<Property["status"], string> = {
    "for-sale": "For Sale",
    "for-rent": "For Rent",
    sold: "Sold",
    pending: "Pending",
};

export const statusLabel = (status: Property["status"]): string => {
    return STATUS_LABELS[status];
};

const TYPE_LABELS: Record<Property["type"], string> = {
    house: "House",
    apartment: "Apartment",
    condo: "Condo",
    villa: "Villa",
    townhouse: "Townhouse",
    land: "Land",
    "farm-lot": "Farm Lot",
    commercial: "Commercial",
    industrial: "Industrial",
};

export const typeLabel = (type: Property["type"]): string => {
    return TYPE_LABELS[type];
};

/**
 * Where the business is, and the only timezone a listing date is read in, because `Intl`
 * would otherwise use the runtime's own and a listing posted after 16:00 UTC renders a
 * different day in a Manila browser, which would date a listing a day off.
 */
const TIME_ZONE = "Asia/Manila";

/** Human-readable date for listing metadata, e.g. "Feb 16, 2025". */
export const formatDate = (iso: string): string => {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: TIME_ZONE,
    }).format(new Date(iso));
};

export const fullAddress = (property: Property): string => {
    const { line1, city, state, zip } = property.address;
    return `${line1}, ${city}, ${state} ${zip}`;
};

const PRC_TITLES: Record<PrcRole, string> = {
    broker: "PRC-licensed broker",
    salesperson: "PRC-accredited salesperson",
};

/** PRC's own titles: a broker is licensed, a salesperson accredited, and never the other way round. */
export const prcTitle = (role: PrcRole): string => PRC_TITLES[role];

/** "1 agent", "3 agents". */
export const plural = (n: number, word: string): string => `${n} ${word}${n === 1 ? "" : "s"}`;
