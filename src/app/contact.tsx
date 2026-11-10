import { useLocalSearchParams } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";

import { ContactForm } from "@/components/contact/contact-form";
import { AppText } from "@/components/ui/app-text";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { ContactParams } from "@/types/routes";

const ContactScreen = () => {
    const theme = useTheme();
    const { propertyId, agentId, message } = useLocalSearchParams<ContactParams>();

    return (
        <KeyboardAvoidingView
            style={[styles.flex, { backgroundColor: theme.background }]}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <AppText color="textMuted">
                    {agentId
                        ? "Your message goes straight to the agent, who will reply by email or phone."
                        : "Questions about a listing, an agent or the site? We read every message."}
                </AppText>
                <ContactForm propertyId={propertyId} agentId={agentId} defaultMessage={message} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    flex: { flex: 1 },
    content: { padding: Spacing.lg, gap: Spacing.lg },
});

export default ContactScreen;
