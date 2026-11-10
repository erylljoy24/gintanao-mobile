import { useEffect, useState } from "react";

import { getProperties, type Property, type PropertyQuery } from "@/lib/api";
import type { PropertySearch } from "@/types/hooks";

const PAGE_SIZE = 12;

interface SearchState {
    key: string;
    items: Property[];
    page: number;
    totalPages: number;
    total: number;
    error?: unknown;
}

/** One growing list of results, fetched a page at a time as the list scrolls. */
export const usePropertySearch = (query: PropertyQuery): PropertySearch => {
    const [version, setVersion] = useState(0);
    const [state, setState] = useState<SearchState>();
    const [loadingMore, setLoadingMore] = useState(false);
    const key = JSON.stringify([query, version]);

    useEffect(() => {
        let active = true;
        const [q] = JSON.parse(key) as [PropertyQuery];
        getProperties({ ...q, page: 1, pageSize: PAGE_SIZE }).then(
            (res) =>
                active &&
                setState({
                    key,
                    items: res.items,
                    page: res.page,
                    totalPages: res.totalPages,
                    total: res.total,
                }),
            (error: unknown) =>
                active && setState({ key, items: [], page: 0, totalPages: 0, total: 0, error }),
        );
        return () => {
            active = false;
        };
    }, [key]);

    const done = state?.key === key;
    const hasMore = done && state.page < state.totalPages;

    const loadMore = () => {
        if (!hasMore || loadingMore || !state) return;
        setLoadingMore(true);
        getProperties({ ...query, page: state.page + 1, pageSize: PAGE_SIZE })
            .then((res) =>
                setState((s) =>
                    s?.key === key
                        ? { ...s, items: [...s.items, ...res.items], page: res.page }
                        : s,
                ),
            )
            // A failed page leaves the list as it was; scrolling to the end again retries it.
            .catch(() => undefined)
            .finally(() => setLoadingMore(false));
    };

    return {
        items: state?.items ?? [],
        total: done ? state.total : undefined,
        error: done ? state.error : undefined,
        loading: !done && state === undefined,
        refreshing: !done && state !== undefined,
        hasMore,
        loadingMore,
        loadMore,
        refresh: () => setVersion((v) => v + 1),
    };
};
