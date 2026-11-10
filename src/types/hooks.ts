import type { Property } from "@/lib/api";

export interface AsyncResult<T> {
    data: T | undefined;
    error: unknown;
    /** Nothing to show yet: the first load. */
    loading: boolean;
    /** Reloading with the previous data still on screen. */
    refreshing: boolean;
    refresh: () => void;
}

export interface PropertySearch {
    items: Property[];
    total: number | undefined;
    error: unknown;
    loading: boolean;
    refreshing: boolean;
    hasMore: boolean;
    loadingMore: boolean;
    loadMore: () => void;
    refresh: () => void;
}
