import { Board } from "../Board";
import { Move, MoveType } from "../Moves";
import { Queen } from "../pieces";
import { Position } from "../positions";
import { DiagonalMoveCalculator } from "./DiagonalMoveCalculator";
import { LineMoveCalculator } from "./LineMoveCalculator";
import { PieceMoveCalculator } from "./PieceMoveCalculator";

export class QueenMoveCalculator implements PieceMoveCalculator {
    getAvailableMovesForPieceIgnoringKingSafety(
        queen: Queen & { position: Position },
        board: Board
    ): Move[] {
        return [
            ...new LineMoveCalculator().getAvailableMovesOnLineIgnoringKingSafety(
                queen,
                board
            ),
            ...new DiagonalMoveCalculator().getAvailableMovesOnLineIgnoringKingSafety(
                queen,
                board
            ),
        ];
    }
}
