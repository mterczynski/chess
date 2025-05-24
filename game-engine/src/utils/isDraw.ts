import { GameState } from "../GameState";

/**
 * @description Returns true if the given game state is a draw state.
 */
export function isDraw(state: GameState): boolean {
    return (
        state === GameState.DRAW_BY_STALEMATE ||
        state === GameState.DRAW_BY_INSUFFICIENT_MATERIAL ||
        state === GameState.DRAW_BY_REPETITION ||
        state === GameState.DRAW_BY_50_MOVE_RULE ||
        state === GameState.DRAW_BY_75_MOVE_RULE ||
        state === GameState.DRAW_BY_AGREEMENT
    );
}
