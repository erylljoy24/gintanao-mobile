import { useColorScheme } from "react-native";

import { Colors, type ThemeColors } from "@/constants/theme";

export const useTheme = (): ThemeColors =>
    useColorScheme() === "dark" ? Colors.dark : Colors.light;
