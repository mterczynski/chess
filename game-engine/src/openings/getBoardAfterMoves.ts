import { Game } from "../Game";
import { Move } from "../Moves";

/**
 * Returns a board after applying a sequence of moves from the initial position.
 */
export function getBoardAfterMoves(
    moves: Move[]
): ReturnType<Game["getBoard"]> {
    const game = new Game();
    for (const move of moves) {
        try {
            game.move(move);
        } catch {
            throw new Error(
                "Invalid move sequence: \n" + JSON.stringify(move, null, 2)
            );
        }
    }
    return game.getBoard();
}
