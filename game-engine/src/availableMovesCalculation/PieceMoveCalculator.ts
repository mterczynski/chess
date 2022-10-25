import { Board } from "../Board";
import { Move } from "../Moves";
import { PieceWithPosition } from "../pieces";

export interface PieceMoveCalculator {
    getAvailableMovesForPieceIgnoringKingSafety(
        piece: PieceWithPosition,
        board: Board,
        ...args: any
    ): Move[];
}
