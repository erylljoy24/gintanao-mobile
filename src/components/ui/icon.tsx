import { SymbolView } from "expo-symbols";

import { useTheme } from "@/hooks/use-theme";
import type { IconProps } from "@/types/ui";

export const Icon = ({ name, size = 18, color }: IconProps) => {
    const theme = useTheme();

    return (
        <SymbolView
            name={{ ios: name.ios, android: name.android, web: name.android }}
            size={size}
            tintColor={color ?? theme.text}
        />
    );
};
