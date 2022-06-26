import { Board } from "../Board";
import { Move } from "../Moves";
import { Rook } from "../pieces";
import { Position } from "../positions";
import { LineMoveCalculator } from "./LineMoveCalculator";

export class RookMoveCalculator {
    getAvailableMovesForPieceIgnoringKingSafety(rook: Rook & { position: Position }, board: Board): Move[] {
        return new LineMoveCalculator().getAvailableMovesOnLineIgnoringKingSafety(rook, board);
    }
}
