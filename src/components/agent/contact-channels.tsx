import { router } from "expo-router";
import { Alert, Linking, StyleSheet, View } from "react-native";

import { ChannelButton } from "@/components/agent/channel-button";
import { Button } from "@/components/ui/button";
import { Icons } from "@/constants/icons";
import { trackLead } from "@/lib/api";
import {
    agentEnquiryText,
    listingEnquiryText,
    messengerHref,
    smsHref,
    telHref,
    viberHref,
    visitReference,
    whatsappHref,
} from "@/lib/contact";
import type { ContactChannel, ContactChannelsProps } from "@/types/agent";

export const ContactChannels = ({ agent, property }: ContactChannelsProps) => {
    const reference = visitReference();
    const text = property
        ? listingEnquiryText(property, reference)
        : agentEnquiryText(agent, reference);

    const channels: ContactChannel[] = [
        { source: "call", label: "Call", icon: Icons.call, href: telHref(agent.phone) },
        { source: "sms", label: "SMS", icon: Icons.sms, href: smsHref(agent.phone, text) },
        {
            source: "whatsapp",
            label: "WhatsApp",
            icon: Icons.chat,
            href: whatsappHref(agent.whatsapp, text),
        },
        { source: "viber", label: "Viber", icon: Icons.chat, href: viberHref(agent.viber) },
        {
            source: "messenger",
            label: "Messenger",
            icon: Icons.chat,
            href: messengerHref(agent.messenger, text),
        },
    ];

    const open = async (channel: ContactChannel & { href: string }) => {
        // Logged before the hand-off and never awaited: a failed log must not block the buyer.
        trackLead({
            source: channel.source,
            agentId: agent.id,
            propertyId: property?.id,
            // A phone call cannot carry the code, so a call tap stays anonymous.
            reference: channel.source === "call" ? undefined : reference,
        }).catch(() => undefined);

        try {
            await Linking.openURL(channel.href);
        } catch {
            Alert.alert(`Couldn't open ${channel.label}`, "Is the app installed on this phone?");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {channels.map(
                    (channel) =>
                        channel.href && (
                            <ChannelButton
                                key={channel.source}
                                label={channel.label}
                                icon={channel.icon}
                                onPress={() => open({ ...channel, href: channel.href! })}
                            />
                        ),
                )}
            </View>
            <Button
                label="Send an enquiry"
                icon={Icons.mail}
                onPress={() =>
                    router.push({
                        pathname: "/contact",
                        params: {
                            agentId: agent.id,
                            ...(property ? { propertyId: property.id } : {}),
                            message: property
                                ? listingEnquiryText(property)
                                : agentEnquiryText(agent),
                        },
                    })
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { gap: 12 },
    grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
});
