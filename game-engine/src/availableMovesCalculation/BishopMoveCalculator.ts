import { Board } from "../Board";
import { Bishop } from "../pieces";
import { Position } from "../positions";
import { DiagonalMoveCalculator } from "./DiagonalMoveCalculator";
import { PieceMoveCalculator } from "./PieceMoveCalculator";

export class BishopMoveCalculator implements PieceMoveCalculator {
    getAvailableMovesForPieceIgnoringKingSafety(
        bishop: Bishop & { position: Position },
        board: Board
    ) {
        return new DiagonalMoveCalculator().getAvailableMovesOnLineIgnoringKingSafety(
            bishop,
            board
        );
    }
}
