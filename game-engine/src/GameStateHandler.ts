import {
    AvailableMoveCalculator,
    CheckCalculator,
} from "./availableMovesCalculation";
import { GameState } from "./GameState";
import { Player } from "./Player";
import { negatePlayer } from "./utils";
import { serializeBoardState } from "./utils/serializeBoardState";
import { Board } from "./Board";
import { Move } from "./Moves";
import { InsufficientMaterialCalculator } from "./InsufficientMaterialCalculator";

/**
 * Handles the logic for determining the new game state after a move.
 */
export class GameStateHandler {
    constructor(
        private availableMoveCalculator: AvailableMoveCalculator,
        private checkCalculator: CheckCalculator,
    ) {}

    /**
     * Calculates the new game state after a move.
     * @param board The current board state.
     * @param currentPlayer The player who just moved.
     * @param positionCounts A map of serialized board states to their occurrence counts.
     * @param currentState The current game state.
     * @param lastMove The last move made in the game.
     * @returns The new GameState.
     */
    getNewGameStateAfterMove(
        board: Board,
        currentPlayer: Player,
        positionCounts: Record<string, number>,
        currentState: GameState,
        lastMove: Move | null,
    ): GameState {
        const key = serializeBoardState(board, currentPlayer);
        if (positionCounts[key] >= 3) {
            return GameState.DRAW_BY_REPETITION;
        }

        // Use InsufficientMaterialCalculator for draw by insufficient material
        if (InsufficientMaterialCalculator.isInsufficientMaterial(board)) {
            return GameState.DRAW_BY_INSUFFICIENT_MATERIAL;
        }

        if (currentState === GameState.UNSTARTED) {
            return GameState.IN_PROGRESS;
        }

        const enemy = negatePlayer(currentPlayer);
        const enemyMoves =
            this.availableMoveCalculator.getAvailableMovesForPlayer(
                board,
                enemy,
                lastMove,
            );

        if (enemyMoves.length === 0) {
            const availableCurrentPlayerMoves =
                this.availableMoveCalculator.getAvailableMovesForPlayer(
                    board,
                    currentPlayer,
                    lastMove,
                );

            const checkingPiecesOfCurrentPlayer =
                this.checkCalculator.getCheckingEnemyPieces(
                    enemy,
                    board,
                    availableCurrentPlayerMoves,
                );

            if (checkingPiecesOfCurrentPlayer.length === 0) {
                return GameState.DRAW_BY_STALEMATE;
            } else {
                // If enemy has no moves and is in check, currentPlayer wins
                return currentPlayer === Player.WHITE
                    ? GameState.WHITE_WON
                    : GameState.BLACK_WON;
            }
        }

        return currentState;
    }
}
