import { Image } from "expo-image";

import { useTheme } from "@/hooks/use-theme";
import type { AvatarProps } from "@/types/ui";

export const Avatar = ({ uri, name, size }: AvatarProps) => {
    const theme = useTheme();

    return (
        <Image
            source={{ uri }}
            accessibilityLabel={name}
            contentFit="cover"
            transition={150}
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: theme.muted,
            }}
        />
    );
};
