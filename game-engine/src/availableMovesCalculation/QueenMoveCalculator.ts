import { Board } from "../Board";
import { Move } from "../Moves";
import { Queen } from "../pieces";
import { Position } from "../positions";
import { DiagonalMoveCalculator } from "./DiagonalMoveCalculator";
import { LineMoveCalculator } from "./LineMoveCalculator";

export class QueenMoveCalculator {
    getAvailableMovesForPieceIgnoringKingSafety(queen: Queen & { position: Position }, board: Board): Move[] {
        return [
            ...new LineMoveCalculator().getAvailableMovesOnLineIgnoringKingSafety(queen, board),
            ...new DiagonalMoveCalculator().getAvailableMovesOnLineIgnoringKingSafety(queen, board),
        ];
    }
}
