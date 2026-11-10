import type { Agent, LeadSource, PrcRole, Property, RealtyRef } from "@/lib/api";
import type { IconName } from "@/types/ui";

export interface AgentCardProps {
    agent: Agent;
}

export interface VerifiedBadgeProps {
    role: PrcRole;
}

export interface RealtyLinkProps {
    realty: RealtyRef;
}

export interface ContactChannelsProps {
    agent: Agent;
    property?: Property;
}

export interface ChannelButtonProps {
    label: string;
    icon: IconName;
    onPress: () => void;
}

export interface ContactChannel {
    source: LeadSource;
    label: string;
    icon: IconName;
    /** Null when the agent has no handle on that channel, so it is not offered. */
    href: string | null;
}
