import { useEffect, useState, type DependencyList } from "react";

import type { AsyncResult } from "@/types/hooks";

interface Settled<T> {
    key: string;
    data?: T;
    error?: unknown;
}

/** Loads once per `deps`, and again on `refresh()` while the previous data stays on screen. */
export const useAsync = <T>(load: () => Promise<T>, deps: DependencyList): AsyncResult<T> => {
    const [version, setVersion] = useState(0);
    const [settled, setSettled] = useState<Settled<T>>();
    const key = JSON.stringify([...deps, version]);

    useEffect(() => {
        let active = true;
        load().then(
            (data) => active && setSettled({ key, data }),
            (error: unknown) => active && setSettled({ key, error }),
        );
        return () => {
            active = false;
        };
        // `key` already encodes `deps`; `load` is a fresh closure every render.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const done = settled?.key === key;

    return {
        data: settled?.data,
        error: done ? settled.error : undefined,
        loading: !done && settled === undefined,
        refreshing: !done && settled !== undefined,
        refresh: () => setVersion((v) => v + 1),
    };
};
