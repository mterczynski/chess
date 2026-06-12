/** Models the user can pick between - from weaker/cheaper to more powerful */
export const GEMINI_MODELS = [
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
    "gemini-2.5-pro",
] as const;

export type GeminiModel = (typeof GEMINI_MODELS)[number];

export const DEFAULT_GEMINI_MODEL: GeminiModel = "gemini-2.5-flash";

export const MIN_GEMINI_ELO = 1400;
export const MAX_GEMINI_ELO = 2800;
/** Roughly the median FIDE rating */
export const DEFAULT_GEMINI_ELO = 1600;

export interface GeminiSettings {
    apiKey: string;
    elo: number;
    model: GeminiModel;
}
