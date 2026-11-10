import { AgentCard } from "@/components/agent/agent-card";
import { ContactChannels } from "@/components/agent/contact-channels";
import { AppText } from "@/components/ui/app-text";
import { Card } from "@/components/ui/card";
import type { ListedByProps } from "@/types/property";

export const ListedBy = ({ agent, property }: ListedByProps) => (
    <Card>
        <AppText variant="subheading">Listed by</AppText>
        <AgentCard agent={agent} />
        <ContactChannels agent={agent} property={property} />
    </Card>
);
