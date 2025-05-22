import { Board } from "../Board";
import { Move, MoveType } from "../Moves";
import { Rook } from "../pieces";
import { Position } from "../positions";
import { LineMoveCalculator } from "./LineMoveCalculator";
import { PieceMoveCalculator } from "./PieceMoveCalculator";

export class RookMoveCalculator implements PieceMoveCalculator {
    getAvailableMovesForPieceIgnoringKingSafety(
        rook: Rook & { position: Position },
        board: Board
    ): Move[] {
        return new LineMoveCalculator().getAvailableMovesOnLineIgnoringKingSafety(
            rook,
            board
        );
    }
}
