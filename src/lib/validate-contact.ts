import type { ContactFormErrors, ContactFormValues } from "@/types/contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** A first pass so obvious mistakes never leave the phone; the backend validates again. */
export const validateContact = (values: ContactFormValues): ContactFormErrors => {
    const errors: ContactFormErrors = {};
    if (values.name.trim().length < 2) errors.name = "Please enter your name.";
    if (!EMAIL_RE.test(values.email.trim())) errors.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10) {
        errors.message = "Please write a little more (at least 10 characters).";
    }
    return errors;
};
