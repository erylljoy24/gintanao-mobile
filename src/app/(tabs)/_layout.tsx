import { NativeTabs } from "expo-router/native-tabs";

import { Icons } from "@/constants/icons";
import { useTheme } from "@/hooks/use-theme";

const TabsLayout = () => {
    const theme = useTheme();

    return (
        <NativeTabs
            backgroundColor={theme.background}
            iconColor={{ default: theme.textMuted, selected: theme.primary }}
            labelStyle={{ selected: { color: theme.primary } }}
        >
            <NativeTabs.Trigger name="index">
                <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf={Icons.home.ios} md={Icons.home.android} />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="properties">
                <NativeTabs.Trigger.Label>Properties</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf={Icons.search.ios} md={Icons.search.android} />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="agents">
                <NativeTabs.Trigger.Label>Agents</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf={Icons.agents.ios} md={Icons.agents.android} />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="realties">
                <NativeTabs.Trigger.Label>Realties</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf={Icons.realty.ios} md={Icons.realty.android} />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="more">
                <NativeTabs.Trigger.Label>More</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf={Icons.more.ios} md={Icons.more.android} />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
};

export default TabsLayout;
