import type { Realty } from "@/lib/api";

export interface RealtyCardProps {
    realty: Realty;
}

export interface RealtyLogoProps {
    realty: Pick<Realty, "name" | "logo">;
    size: number;
}
