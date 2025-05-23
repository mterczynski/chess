import { Move } from "../Moves";
import { openings } from "../openings/openings";
import { areMovesEqual } from "./areMovesEqual";

/**
 * Finds the opening that matches the given move history.
 * Returns the matched opening object, or null if none found.
 */
export function findOpeningByMoves(
    moveHistory: Move[] | null | undefined
): (typeof openings)[number] | null {
    if (!moveHistory || moveHistory.length === 0) return null;
    const matchingOpenings = openings.filter(
        (opening) =>
            moveHistory.length >= opening.moves.length &&
            opening.moves.every((move, index) =>
                areMovesEqual(move, moveHistory[index])
            )
    );
    return (
        matchingOpenings.sort((a, b) => a.moves.length - b.moves.length)[0] ||
        null
    );
}
