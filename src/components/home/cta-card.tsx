import { AppText } from "@/components/ui/app-text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CtaCardProps } from "@/types/contact";

export const CtaCard = ({ title, body, actionLabel, onPress }: CtaCardProps) => (
    <Card>
        <AppText variant="subheading">{title}</AppText>
        <AppText variant="small" color="textMuted">
            {body}
        </AppText>
        <Button label={actionLabel} variant="outline" onPress={onPress} />
    </Card>
);
