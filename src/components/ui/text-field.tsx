import { StyleSheet, TextInput, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { TextFieldProps } from "@/types/ui";

export const TextField = ({ label, error, style, multiline, ...rest }: TextFieldProps) => {
    const theme = useTheme();

    return (
        <View style={styles.field}>
            {label && (
                <AppText variant="small" bold>
                    {label}
                </AppText>
            )}
            <TextInput
                placeholderTextColor={theme.textMuted}
                multiline={multiline}
                accessibilityLabel={label}
                style={[
                    styles.input,
                    multiline && styles.multiline,
                    {
                        color: theme.text,
                        backgroundColor: theme.card,
                        borderColor: error ? theme.danger : theme.border,
                    },
                    style,
                ]}
                {...rest}
            />
            {error && (
                <AppText variant="caption" color="danger">
                    {error}
                </AppText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    field: { gap: Spacing.xs },
    input: {
        minHeight: 46,
        borderWidth: 1,
        borderRadius: Radius.md,
        paddingHorizontal: Spacing.md,
        fontSize: 15,
    },
    multiline: {
        minHeight: 120,
        paddingTop: Spacing.md,
        textAlignVertical: "top",
    },
});
