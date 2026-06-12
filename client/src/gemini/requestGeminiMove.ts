import { Move } from "game-engine";
import { buildGeminiRequestBody, GeminiMoveContext } from "./buildGeminiRequest";
import { GeminiResponseError, parseGeminiMove } from "./parseGeminiResponse";
import { GeminiModel } from "./geminiSettings";

const GEMINI_API_BASE_URL =
    "https://generativelanguage.googleapis.com/v1beta/models";

/** How many times we ask Gemini again when it returns an invalid/illegal move */
const MAX_ATTEMPTS = 3;

/** Thrown when the Gemini API call itself fails (network/auth/quota) - not retried */
export class GeminiApiError extends Error {
    constructor(
        message: string,
        public status?: number,
    ) {
        super(message);
        this.name = "GeminiApiError";
        // keep instanceof working when compiled to ES5
        Object.setPrototypeOf(this, GeminiApiError.prototype);
    }
}

export interface GeminiMoveRequest extends GeminiMoveContext {
    apiKey: string;
    model: GeminiModel;
}

async function callGeminiApi(request: GeminiMoveRequest): Promise<string> {
    const response = await fetch(
        `${GEMINI_API_BASE_URL}/${request.model}:generateContent`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": request.apiKey,
            },
            body: JSON.stringify(buildGeminiRequestBody(request)),
        },
    );

    const data: any = await response.json().catch(() => null);

    if (!response.ok) {
        const apiMessage =
            data?.error?.message || `Gemini API request failed`;
        throw new GeminiApiError(
            `${apiMessage} (status ${response.status})`,
            response.status,
        );
    }

    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof responseText !== "string") {
        throw new GeminiResponseError(
            "Gemini API response contains no move text",
        );
    }

    return responseText;
}

/**
 * Asks Gemini for the next move. Invalid or illegal moves are retried up to
 * MAX_ATTEMPTS times; API errors (e.g. invalid key) fail immediately.
 */
export async function requestGeminiMove(
    request: GeminiMoveRequest,
): Promise<Move> {
    let lastError: Error = new GeminiResponseError(
        "Gemini did not return a move",
    );

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        try {
            const responseText = await callGeminiApi(request);
            return parseGeminiMove(responseText, request.availableMoves);
        } catch (error) {
            if (!(error instanceof GeminiResponseError)) {
                throw error;
            }
            lastError = error;
        }
    }

    throw lastError;
}
