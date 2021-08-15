import { Board } from "../Board";
import { Move } from "../Move";
import { PieceWithPosition } from "../pieces";

export interface MoveCalculator {
    getAvailableMovesForPieceIgnoringKingSafety(piece: PieceWithPosition, board: Board, ...args: any): Move[];
}
