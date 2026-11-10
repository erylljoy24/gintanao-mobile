import type { ReactNode } from "react";
import type { StyleProp, TextInputProps, TextProps, ViewStyle } from "react-native";
import type { AndroidSymbol, SFSymbol } from "expo-symbols";

import type { ThemeColor } from "@/constants/theme";

export interface IconName {
    ios: SFSymbol;
    android: AndroidSymbol;
}

export interface IconProps {
    name: IconName;
    size?: number;
    color?: string;
}

export interface AppTextProps extends TextProps {
    variant?: "title" | "heading" | "subheading" | "body" | "small" | "caption";
    color?: ThemeColor;
    bold?: boolean;
}

export interface ButtonProps {
    label: string;
    onPress: () => void;
    variant?: "primary" | "outline";
    icon?: IconName;
    disabled?: boolean;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}

export interface ChipProps {
    label: string;
    selected: boolean;
    onPress: () => void;
}

export interface BadgeProps {
    label: string;
    tone: "primary" | "dark" | "success" | "muted";
}

export interface ErrorViewProps {
    error: unknown;
    onRetry: () => void;
}

export interface EmptyViewProps {
    title: string;
    body?: string;
    children?: ReactNode;
}

export interface SectionHeaderProps {
    title: string;
    actionLabel?: string;
    onAction?: () => void;
}

export interface TextFieldProps extends TextInputProps {
    label?: string;
    error?: string;
}

export interface LinkRowProps {
    label: string;
    icon: IconName;
    onPress: () => void;
}

export interface CardProps {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
}

export interface ScreenTitleProps {
    title: string;
    subtitle?: string;
}

export interface AvatarProps {
    uri: string;
    name: string;
    size: number;
}
