import type { Agent, Property } from "@/lib/api";
import { typeLabel } from "@/lib/format";
import { hasRooms } from "@/lib/property-kind";

/** The web enquiry form's caps, so a message accepted there is accepted here. */
export const CONTACT_LIMITS = {
    name: 100,
    email: 254,
    phone: 25,
    message: 2000,
} as const;

// ---------------------------------------------------------------------------
// The enquiry reference
// ---------------------------------------------------------------------------

/**
 * Digits and capitals less the characters misread off a phone screen (0/O, 1/I/L, 8/B, and
 * U for V), a shape the backend validates too (`Lead::REFERENCE_PATTERN`) and which must
 * not drift.
 */
const REFERENCE_ALPHABET = "23456789ACDEFGHJKMNPQRSTWXYZ";

/**
 * A code for one visit, carried into the message the buyer sends, because every chat
 * channel hands them to an app this system cannot see into and the agent needs something
 * to paste into the panel's search.
 */
const newLeadReference = (): string => {
    // Minted client-side because the API's own id would mean awaiting a round trip
    // before a hand-off that must never block, and a correlation code is not a secret.
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += REFERENCE_ALPHABET[Math.floor(Math.random() * REFERENCE_ALPHABET.length)];
    }
    return `GT-${code}`;
};

/** Minted once per app launch, then the same code for the rest of the session. */
let visitCode: string | undefined;

export const visitReference = (): string => (visitCode ??= newLeadReference());

const withRef = (text: string, reference?: string): string =>
    reference ? `${text} (ref ${reference})` : text;

// ---------------------------------------------------------------------------
// Pre-filled message text
// ---------------------------------------------------------------------------

/** Short human reference for a listing, e.g. "Ref #P1 - 2BR Condo, Lanang". */
export const listingRef = (property: Property): string => {
    const beds = !hasRooms(property.type)
        ? ""
        : property.bedrooms === 0
          ? "Studio "
          : `${property.bedrooms}BR `;
    return `Ref #${property.id.toUpperCase()} - ${beds}${typeLabel(property.type)}, ${property.address.neighborhood}`;
};

/** Pre-filled enquiry for a specific listing. */
export const listingEnquiryText = (property: Property, reference?: string): string => {
    return withRef(
        `Hi, I'm interested in [${listingRef(property)}]. Is it still available?`,
        reference,
    );
};

/** Pre-filled "request a viewing" message for a listing. */
export const viewingRequestText = (property: Property, reference?: string): string => {
    return withRef(
        `Hi, I'd like to request a viewing for [${listingRef(property)}], in person or a video walkthrough. What times are available?`,
        reference,
    );
};

/** Generic message when contacting an agent without a specific listing. */
export const agentEnquiryText = (agent: Agent, reference?: string): string => {
    const first = agent.name.split(" ")[0];
    return withRef(`Hi ${first}, I'd like to ask about a property you're listing.`, reference);
};

// ---------------------------------------------------------------------------
// Deep-link builders: each returns null when the handle is absent, so callers
// can render only the channels an agent actually has.
// ---------------------------------------------------------------------------

/** Messenger: m.me/<page> with a prefilled message (reliable prefill). */
export const messengerHref = (user?: string, text?: string): string | null => {
    if (!user) return null;
    const handle = user.replace(/^https?:\/\/(m\.me|www\.messenger\.com)\//, "");
    const qs = text ? `?text=${encodeURIComponent(text)}` : "";
    return `https://m.me/${handle}${qs}`;
};

/** WhatsApp: wa.me/<number> with a prefilled message (most reliable prefill). */
export const whatsappHref = (digits?: string, text?: string): string | null => {
    if (!digits) return null;
    const num = digits.replace(/\D/g, "");
    if (!num) return null;
    const qs = text ? `?text=${encodeURIComponent(text)}` : "";
    return `https://wa.me/${num}${qs}`;
};

/**
 * Viber's prefill is unreliable across app versions, so this deliberately passes no message
 * text.
 */
export const viberHref = (number?: string): string | null => {
    if (!number) return null;
    return `viber://chat?number=${encodeURIComponent(number)}`;
};

/** Plain phone call. */
export const telHref = (phone?: string): string | null => {
    if (!phone) return null;
    const num = phone.replace(/[^\d+]/g, "");
    return num ? `tel:${num}` : null;
};

/** SMS with an optional prefilled body. */
export const smsHref = (phone?: string, text?: string): string | null => {
    if (!phone) return null;
    const num = phone.replace(/[^\d+]/g, "");
    if (!num) return null;
    const qs = text ? `?&body=${encodeURIComponent(text)}` : "";
    return `sms:${num}${qs}`;
};
