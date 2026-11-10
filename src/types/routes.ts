// Route params arrive as strings (or arrays, for repeated keys) from expo-router.

export type SlugParams = { slug: string };

export type PropertiesParams = { q?: string };

export type ContactParams = { propertyId?: string; agentId?: string; message?: string };
