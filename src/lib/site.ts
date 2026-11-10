export const siteConfig = {
    name: "Gintanao",
    tagline: "Find a place you'll love to call home",
    description:
        "Browse homes for sale across the Philippines and connect with PRC-verified agents.",
    /** The web portal, for share links and the pages the app does not carry (legal, loan calculator). */
    url: process.env.EXPO_PUBLIC_SITE_URL ?? "http://localhost:3000",
    /** The backend's public origin, where brokers and agents sign up and sign in. */
    dashboardUrl: process.env.EXPO_PUBLIC_DASHBOARD_URL ?? "http://localhost:8000",
    contact: {
        email: "hello@gintanao.com",
        facebook: "https://www.facebook.com/Gintanao",
        /** The Facebook page's username, for m.me/<username> links. */
        messenger: "Gintanao",
        address: "Davao City, Philippines",
    },
} as const;

export const agentLinks = [
    { title: "Join as an agent", href: `${siteConfig.dashboardUrl}/register` },
    { title: "Register your realty", href: `${siteConfig.dashboardUrl}/apply` },
    { title: "Agent sign in", href: `${siteConfig.dashboardUrl}/login` },
] as const;

export const webLinks = [
    { title: "Loan calculator", href: `${siteConfig.url}/loan-calculator` },
    { title: "Privacy", href: `${siteConfig.url}/privacy` },
    { title: "Terms", href: `${siteConfig.url}/terms` },
    { title: "Accessibility", href: `${siteConfig.url}/accessibility` },
] as const;

export const propertyUrl = (slug: string): string => `${siteConfig.url}/properties/${slug}`;
