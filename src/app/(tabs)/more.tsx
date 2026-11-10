import Constants from "expo-constants";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Linking, ScrollView, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { LinkRow } from "@/components/ui/link-row";
import { ScreenTitle } from "@/components/ui/screen-title";
import { Icons } from "@/constants/icons";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { messengerHref } from "@/lib/contact";
import { agentLinks, siteConfig, webLinks } from "@/lib/site";

const MoreScreen = () => {
    const theme = useTheme();
    const messenger = messengerHref(siteConfig.contact.messenger);

    return (
        <ScrollView
            style={{ backgroundColor: theme.background }}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.content}
        >
            <ScreenTitle title={siteConfig.name} subtitle={siteConfig.description} />

            <AppText variant="small" bold color="textMuted" style={styles.group}>
                GET IN TOUCH
            </AppText>
            <View style={[styles.list, { borderTopColor: theme.border }]}>
                <LinkRow
                    label="Send us a message"
                    icon={Icons.mail}
                    onPress={() => router.push("/contact")}
                />
                {messenger && (
                    <LinkRow
                        label="Chat on Messenger"
                        icon={Icons.chat}
                        onPress={() => Linking.openURL(messenger)}
                    />
                )}
                <LinkRow
                    label={siteConfig.contact.email}
                    icon={Icons.mail}
                    onPress={() => Linking.openURL(`mailto:${siteConfig.contact.email}`)}
                />
            </View>

            <AppText variant="small" bold color="textMuted" style={styles.group}>
                FOR AGENTS
            </AppText>
            <View style={[styles.list, { borderTopColor: theme.border }]}>
                {agentLinks.map((link) => (
                    <LinkRow
                        key={link.href}
                        label={link.title}
                        icon={Icons.external}
                        onPress={() => WebBrowser.openBrowserAsync(link.href)}
                    />
                ))}
            </View>

            <AppText variant="small" bold color="textMuted" style={styles.group}>
                ON THE WEB
            </AppText>
            <View style={[styles.list, { borderTopColor: theme.border }]}>
                {webLinks.map((link) => (
                    <LinkRow
                        key={link.href}
                        label={link.title}
                        icon={Icons.external}
                        onPress={() => WebBrowser.openBrowserAsync(link.href)}
                    />
                ))}
            </View>

            <AppText variant="caption" style={styles.footer}>
                {siteConfig.contact.address} · v{Constants.expoConfig?.version}
            </AppText>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    content: { paddingBottom: Spacing.xxl },
    group: {
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.xl,
        marginBottom: Spacing.sm,
    },
    list: { borderTopWidth: StyleSheet.hairlineWidth },
    footer: { textAlign: "center", marginTop: Spacing.xl },
});

export default MoreScreen;
