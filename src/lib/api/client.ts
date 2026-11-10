import type {
    Agent,
    ContactPayload,
    ContactResult,
    LeadPayload,
    LeadResult,
    Paginated,
    Property,
    PropertyQuery,
    Realty,
    RealtyQuery,
} from "./types";

// Inlined at bundle time by Expo, so changing it means restarting `expo start`.
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public detail?: string,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

// No API key is sent: anything bundled into the app is readable by whoever installs it.
const apiFetch = async <T>(path: string, init?: RequestInit): Promise<T> => {
    if (!API_BASE_URL) {
        throw new Error("EXPO_PUBLIC_API_BASE_URL is unset — copy .env.example to .env.");
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...init?.headers,
        },
    });

    if (!res.ok) {
        // Laravel puts a readable reason in `message`, which a 422 needs to reach the buyer.
        const body = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new ApiError(
            `Request to ${path} failed with ${res.status}`,
            res.status,
            body?.message,
        );
    }

    return (await res.json()) as T;
};

const toSearchParams = (query: PropertyQuery | RealtyQuery): string => {
    const parts = Object.entries(query)
        .filter(([, value]) => value !== undefined && value !== null && value !== "")
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    return parts.length ? `?${parts.join("&")}` : "";
};

const orNullOn404 = async <T>(request: Promise<T>): Promise<T | null> => {
    try {
        return await request;
    } catch (err) {
        if (err instanceof ApiError && err.status === 404) return null;
        throw err;
    }
};

export const getProperties = (query: PropertyQuery = {}): Promise<Paginated<Property>> =>
    apiFetch<Paginated<Property>>(`/properties${toSearchParams(query)}`);

export const getFeaturedProperties = async (limit = 5): Promise<Property[]> => {
    // For sale only: the promotion slot exists to sell homes.
    const res = await getProperties({ featured: true, status: "for-sale", pageSize: limit });
    return res.items;
};

export const getPropertyBySlug = (slug: string): Promise<Property | null> =>
    orNullOn404(apiFetch<Property>(`/properties/${encodeURIComponent(slug)}`));

export const getAgents = (): Promise<Agent[]> => apiFetch<Agent[]>(`/agents`);

export const getAgentBySlug = (slug: string): Promise<Agent | null> =>
    orNullOn404(apiFetch<Agent>(`/agents/${encodeURIComponent(slug)}`));

export const getAgentById = (id: string): Promise<Agent | null> =>
    orNullOn404(apiFetch<Agent>(`/agents/by-id/${encodeURIComponent(id)}`));

export const getRealties = (query: RealtyQuery = {}): Promise<Paginated<Realty>> =>
    apiFetch<Paginated<Realty>>(`/realties${toSearchParams(query)}`);

/** By its current slug or a former one; the backend answers both with the current realty. */
export const getRealtyBySlug = (slug: string): Promise<Realty | null> =>
    orNullOn404(apiFetch<Realty>(`/realties/${encodeURIComponent(slug)}`));

export const getRealtyListings = (slug: string, pageSize = 6): Promise<Paginated<Property>> =>
    apiFetch<Paginated<Property>>(
        `/realties/${encodeURIComponent(slug)}/listings?pageSize=${pageSize}`,
    );

export const submitContact = (payload: ContactPayload): Promise<ContactResult> =>
    apiFetch<ContactResult>(`/contact`, { method: "POST", body: JSON.stringify(payload) });

export const trackLead = (payload: LeadPayload): Promise<LeadResult> =>
    apiFetch<LeadResult>(`/leads`, { method: "POST", body: JSON.stringify(payload) });
