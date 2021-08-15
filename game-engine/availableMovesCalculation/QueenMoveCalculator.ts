import { Board } from "../Board";
import { Move } from "../Move";
import { Queen } from "../pieces";
import { Position } from "../positions";

export class QueenMoveCalculator {
    getAvailableMovesForPieceIgnoringKingSafety(queen: Queen & {position: Position}, board: Board): Move[] {
        // todo
        return [];
    }
}
