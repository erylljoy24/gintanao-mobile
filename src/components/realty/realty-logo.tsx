import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Radius } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { RealtyLogoProps } from "@/types/realty";

export const RealtyLogo = ({ realty, size }: RealtyLogoProps) => {
    const theme = useTheme();
    const box = { width: size, height: size, borderColor: theme.border };

    if (!realty.logo) {
        return (
            <View style={[styles.box, box, { backgroundColor: theme.muted }]}>
                <AppText variant="subheading" color="textMuted">
                    {realty.name.charAt(0).toUpperCase()}
                </AppText>
            </View>
        );
    }

    return (
        <Image
            source={{ uri: realty.logo }}
            accessibilityLabel={`${realty.name} logo`}
            contentFit="contain"
            style={[styles.box, box, { backgroundColor: "#ffffff" }]}
        />
    );
};

const styles = StyleSheet.create({
    box: {
        borderRadius: Radius.md,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
