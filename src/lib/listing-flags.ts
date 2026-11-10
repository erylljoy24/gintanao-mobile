import type { Property } from "@/lib/api";

/** Listings created within this window get the "New" badge. */
const NEW_LISTING_DAYS = 7;

export const isNewListing = (property: Property, now: number = Date.now()): boolean => {
    const ageMs = now - new Date(property.createdAt).getTime();
    return ageMs < NEW_LISTING_DAYS * 24 * 60 * 60 * 1000;
};

export const isSold = (property: Property): boolean => property.status === "sold";
