import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { PropertyGalleryProps } from "@/types/property";

export const PropertyGallery = ({ images }: PropertyGalleryProps) => {
    const theme = useTheme();
    const { width } = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const height = Math.round((width * 2) / 3);

    return (
        <View>
            <FlatList
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(uri, i) => `${i}-${uri}`}
                onMomentumScrollEnd={(e) =>
                    setIndex(Math.round(e.nativeEvent.contentOffset.x / width))
                }
                renderItem={({ item, index: i }) => (
                    <Image
                        source={{ uri: item }}
                        accessibilityLabel={`Photo ${i + 1} of ${images.length}`}
                        contentFit="cover"
                        transition={200}
                        style={{ width, height, backgroundColor: theme.muted }}
                    />
                )}
            />
            {images.length > 1 && (
                <View style={[styles.counter, { backgroundColor: theme.overlay }]}>
                    <AppText variant="caption" bold style={styles.counterText}>
                        {index + 1} / {images.length}
                    </AppText>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    counter: {
        position: "absolute",
        right: Spacing.md,
        bottom: Spacing.md,
        paddingHorizontal: Spacing.sm,
        paddingVertical: 3,
        borderRadius: Radius.full,
    },
    counterText: { color: "#ffffff" },
});
