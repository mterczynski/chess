import { Board, Move, Player } from "game-engine";

export interface GeminiMoveContext {
    /** Player Gemini is playing as */
    player: Player;
    /** FIDE rating Gemini should play at */
    elo: number;
    board: Board;
    /** Last move played by the human player, or null if Gemini moves first */
    lastMove: Move | null;
    /** All legal moves Gemini can play right now */
    availableMoves: Move[];
}

/**
 * Gemini structured output schema (OpenAPI subset) matching
 * game-engine's Move interface.
 */
export const GEMINI_MOVE_RESPONSE_SCHEMA = {
    type: "OBJECT",
    properties: {
        from: {
            type: "OBJECT",
            properties: {
                file: {
                    type: "STRING",
                    enum: ["A", "B", "C", "D", "E", "F", "G", "H"],
                },
                rank: { type: "INTEGER", minimum: 1, maximum: 8 },
            },
            required: ["file", "rank"],
        },
        to: {
            type: "OBJECT",
            properties: {
                file: {
                    type: "STRING",
                    enum: ["A", "B", "C", "D", "E", "F", "G", "H"],
                },
                rank: { type: "INTEGER", minimum: 1, maximum: 8 },
            },
            required: ["file", "rank"],
        },
        promoteTo: {
            type: "STRING",
            enum: ["Q", "R", "B", "N"],
            nullable: true,
        },
    },
    required: ["from", "to"],
} as const;

export function buildSystemPrompt(player: Player, elo: number): string {
    return `You are a chess opponent playing as ${player} in a chess game.

You will receive a JSON payload describing the current game:
- "board": the current board as an object whose keys are the files "A"-"H". Each value is an array of 8 entries where index 0 is rank 1 and index 7 is rank 8. Each entry is either null (empty square) or a piece object: { "player": "WHITE" | "BLACK", "type": "K" | "Q" | "R" | "B" | "N" | "P" } ("K" = king, "Q" = queen, "R" = rook, "B" = bishop, "N" = knight, "P" = pawn).
- "lastMove": the last move played by your opponent as { "from": { "file", "rank" }, "to": { "file", "rank" } }, or null if you are making the first move of the game.
- "availableMoves": the complete list of moves that are legal for you right now.

Rules you must follow strictly:
1. Respond with a single JSON object only - no commentary, no markdown, no code fences.
2. The response must have the shape { "from": { "file": "A"-"H", "rank": 1-8 }, "to": { "file": "A"-"H", "rank": 1-8 } }, with an additional "promoteTo" field ("Q", "R", "B" or "N") if and only if the move promotes a pawn.
3. Your move MUST be one of the entries in "availableMoves" - match its "from" and "to" exactly. Never invent a move that is not in that list.
4. Castling is represented as the king moving two files; en passant as the capturing pawn's diagonal move. Both appear in "availableMoves" like any other move.

Play with the strength and style of a human chess player with a FIDE rating of ${elo}. Choose the move such a player would most plausibly choose: a low rating means occasional inaccuracies and simple plans, a high rating means strong, principled play. Do not play noticeably stronger or weaker than a typical ${elo}-rated FIDE player.`;
}

export function buildUserPrompt(context: GeminiMoveContext): string {
    return JSON.stringify({
        board: context.board,
        lastMove: context.lastMove,
        availableMoves: context.availableMoves,
    });
}

/** Builds the body for a Gemini generateContent request */
export function buildGeminiRequestBody(context: GeminiMoveContext): object {
    return {
        systemInstruction: {
            parts: [{ text: buildSystemPrompt(context.player, context.elo) }],
        },
        contents: [
            {
                role: "user",
                parts: [{ text: buildUserPrompt(context) }],
            },
        ],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: GEMINI_MOVE_RESPONSE_SCHEMA,
        },
    };
}
