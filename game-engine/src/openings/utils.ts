import { Move } from "../Moves";
import { Opening } from "./openings";
import { getBoardAfterMoves } from "./getBoardAfterMoves";
import { serializeBoardState } from "../utils/serializeBoardState";
import { Player } from "../Player";

/**
 * Finds the longest matching opening by move history.
 * Todo: find an opening regardless of how the opening was achieved (compare only final positions, use moveHistory only to calculate final board positions)
 * Returns the name of the opening, or null if none matches.
 */
export function findOpeningByMoves(
    moveHistory: Move[],
    openings: Opening[]
): string | null {
    if (!moveHistory || moveHistory.length === 0) return null;

    const userBoard = getBoardAfterMoves(moveHistory);
    if (!userBoard) return null;
    const userBoardKey = serializeBoardState(
        userBoard,
        moveHistory.length % 2 === 0 ? Player.WHITE : Player.BLACK
    );

    const matchingOpenings = openings.filter((opening) => {
        if (moveHistory.length < opening.moves.length) return false;
        const openingBoard = getBoardAfterMoves(opening.moves);
        if (!openingBoard) return false;
        const openingBoardKey = serializeBoardState(
            openingBoard,
            opening.moves.length % 2 === 0 ? Player.WHITE : Player.BLACK
        );
        return userBoardKey === openingBoardKey;
    });

    return (
        matchingOpenings.sort((a, b) => b.moves.length - a.moves.length)[0]
            ?.name || null
    );
}
