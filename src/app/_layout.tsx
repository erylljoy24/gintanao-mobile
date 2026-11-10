import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";

const RootLayout = () => {
    const dark = useColorScheme() === "dark";
    const base = dark ? DarkTheme : DefaultTheme;
    const colors = dark ? Colors.dark : Colors.light;

    return (
        <ThemeProvider
            value={{
                ...base,
                colors: {
                    ...base.colors,
                    primary: colors.primary,
                    background: colors.background,
                    card: colors.card,
                    text: colors.text,
                    border: colors.border,
                },
            }}
        >
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="property/[slug]" options={{ title: "Listing" }} />
                <Stack.Screen name="agent/[slug]" options={{ title: "Agent" }} />
                <Stack.Screen name="realty/[slug]" options={{ title: "Realty" }} />
                <Stack.Screen
                    name="contact"
                    options={{ title: "Send an enquiry", presentation: "modal" }}
                />
            </Stack>
        </ThemeProvider>
    );
};

export default RootLayout;
