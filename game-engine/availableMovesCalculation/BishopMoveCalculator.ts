import { Board } from "../Board";
import { Bishop } from "../pieces";
import { Position } from "../positions";
import { DiagonalMoveCalculator } from "./DiagonalMoveCalculator";
import { MoveCalculator } from "./MoveCalculator";

export class BishopMoveCalculator implements MoveCalculator {
    getAvailableMovesForPieceIgnoringKingSafety(bishop: Bishop & {position: Position}, board: Board) {
        return new DiagonalMoveCalculator().getAvailableMovesOnLineIgnoringKingSafety(bishop, board);
    }
}
