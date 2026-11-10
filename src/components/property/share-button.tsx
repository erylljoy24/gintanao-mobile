import { Pressable, Share } from "react-native";

import { Icon } from "@/components/ui/icon";
import { Icons } from "@/constants/icons";
import { useTheme } from "@/hooks/use-theme";
import type { ShareButtonProps } from "@/types/property";

export const ShareButton = ({ title, url }: ShareButtonProps) => {
    const theme = useTheme();

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel="Share listing"
            hitSlop={10}
            onPress={() => Share.share({ title, message: `${title}\n${url}`, url })}
        >
            <Icon name={Icons.share} size={20} color={theme.primary} />
        </Pressable>
    );
};
