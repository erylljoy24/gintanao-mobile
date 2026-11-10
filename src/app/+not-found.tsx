import { router, Stack } from "expo-router";

import { Button } from "@/components/ui/button";
import { EmptyView } from "@/components/ui/empty-view";

const NotFoundScreen = () => (
    <>
        <Stack.Screen options={{ title: "Not found" }} />
        <EmptyView title="This page doesn't exist">
            <Button label="Go home" onPress={() => router.replace("/")} />
        </EmptyView>
    </>
);

export default NotFoundScreen;
