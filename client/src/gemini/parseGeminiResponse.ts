import {
    arePositionsEqual,
    ChessFile,
    Move,
    PieceType,
    PromotablePieceType,
    PromotionMove,
    SpecialMoveType,
} from "game-engine";

/** Thrown when Gemini returns something that is not a legal move - safe to retry */
export class GeminiResponseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "GeminiResponseError";
        // keep instanceof working when compiled to ES5
        Object.setPrototypeOf(this, GeminiResponseError.prototype);
    }
}

const PROMOTABLE_PIECE_TYPES: PromotablePieceType[] = [
    PieceType.QUEEN,
    PieceType.ROOK,
    PieceType.BISHOP,
    PieceType.KNIGHT,
];

function isValidPosition(position: any): boolean {
    return (
        !!position &&
        Object.values(ChessFile).includes(position.file) &&
        Number.isInteger(position.rank) &&
        position.rank >= 1 &&
        position.rank <= 8
    );
}

/**
 * Parses Gemini's JSON response text into a Move from `availableMoves`.
 * Returning the matching available move (instead of the raw parsed object)
 * keeps engine metadata like `isAttacking` and special move types intact.
 */
export function parseGeminiMove(
    responseText: string,
    availableMoves: Move[],
): Move {
    let parsed: any;
    try {
        parsed = JSON.parse(responseText);
    } catch {
        throw new GeminiResponseError(
            `Gemini response is not valid JSON: ${responseText}`,
        );
    }

    if (!isValidPosition(parsed?.from) || !isValidPosition(parsed?.to)) {
        throw new GeminiResponseError(
            `Gemini response is not a valid move: ${responseText}`,
        );
    }

    const matchingMove = availableMoves.find(
        (move) =>
            arePositionsEqual(move.from, parsed.from) &&
            arePositionsEqual(move.to, parsed.to),
    );

    if (!matchingMove) {
        throw new GeminiResponseError(
            `Gemini returned an illegal move: ${responseText}`,
        );
    }

    if ((matchingMove as PromotionMove).type === SpecialMoveType.PROMOTION) {
        const promoteTo = PROMOTABLE_PIECE_TYPES.includes(parsed.promoteTo)
            ? (parsed.promoteTo as PromotablePieceType)
            : PieceType.QUEEN;

        return { ...matchingMove, promoteTo } as PromotionMove;
    }

    return matchingMove;
}
