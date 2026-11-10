import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextField } from "@/components/ui/text-field";
import { Icons } from "@/constants/icons";
import { Spacing } from "@/constants/theme";
import { ApiError, submitContact } from "@/lib/api";
import { CONTACT_LIMITS } from "@/lib/contact";
import { validateContact } from "@/lib/validate-contact";
import type { ContactFormErrors, ContactFormProps, ContactFormValues } from "@/types/contact";

export const ContactForm = ({ propertyId, agentId, defaultMessage = "" }: ContactFormProps) => {
    const [values, setValues] = useState<ContactFormValues>({
        name: "",
        email: "",
        phone: "",
        message: defaultMessage,
    });
    const [errors, setErrors] = useState<ContactFormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [failure, setFailure] = useState<string>();
    const [sent, setSent] = useState<string>();

    const set = (field: keyof ContactFormValues) => (text: string) =>
        setValues((v) => ({ ...v, [field]: text }));

    const submit = async () => {
        const found = validateContact(values);
        setErrors(found);
        setFailure(undefined);
        if (Object.keys(found).length > 0) return;

        setSubmitting(true);
        try {
            const result = await submitContact({
                name: values.name.trim(),
                email: values.email.trim(),
                phone: values.phone.trim() || undefined,
                message: values.message.trim(),
                propertyId,
                agentId,
            });
            setSent(result.message);
        } catch (err) {
            // A 422 is the backend refusing (often an agent no longer verified); retrying cannot help.
            setFailure(
                err instanceof ApiError && err.status === 422 && err.detail
                    ? err.detail
                    : "Something went wrong sending your message. Please try again.",
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (sent) {
        return (
            <Card>
                <AppText variant="subheading">Message sent</AppText>
                <AppText color="textMuted">{sent}</AppText>
            </Card>
        );
    }

    return (
        <View style={styles.form}>
            <TextField
                label="Name"
                value={values.name}
                onChangeText={set("name")}
                error={errors.name}
                maxLength={CONTACT_LIMITS.name}
                autoComplete="name"
                textContentType="name"
            />
            <TextField
                label="Email"
                value={values.email}
                onChangeText={set("email")}
                error={errors.email}
                maxLength={CONTACT_LIMITS.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
            />
            <TextField
                label="Phone (optional)"
                value={values.phone}
                onChangeText={set("phone")}
                error={errors.phone}
                maxLength={CONTACT_LIMITS.phone}
                keyboardType="phone-pad"
                autoComplete="tel"
                textContentType="telephoneNumber"
            />
            <TextField
                label="Message"
                value={values.message}
                onChangeText={set("message")}
                error={errors.message}
                maxLength={CONTACT_LIMITS.message}
                multiline
            />
            {failure && (
                <AppText variant="small" color="danger" accessibilityLiveRegion="polite">
                    {failure}
                </AppText>
            )}
            <Button label="Send message" icon={Icons.send} loading={submitting} onPress={submit} />
        </View>
    );
};

const styles = StyleSheet.create({
    form: { gap: Spacing.lg },
});
