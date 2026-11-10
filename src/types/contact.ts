export interface ContactFormProps {
    propertyId?: string;
    agentId?: string;
    defaultMessage?: string;
}

export interface ContactFormValues {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export interface CtaCardProps {
    title: string;
    body: string;
    actionLabel: string;
    onPress: () => void;
}
