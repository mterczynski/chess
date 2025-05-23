import { Board } from "../Board";
import { Move } from "../Moves";
import { PieceType } from "../pieces";
import { isAttackingMove } from "../utils/isAttackingMove";
import _ from "lodash";

export class CaptureIfAvailableBot {
    /**
     * Selects a capture move if available, prioritizing captures in this order:
     * Queen > Rook > Bishop/Knight > Pawn. If no capture is available, picks a random move.
     */
    makeMove(board: Board, availableMoves: Move[]): Move {
        if (!availableMoves || availableMoves.length === 0) {
            throw new Error("No available moves");
        }

        // Priority: Queen > Rook > Bishop/Knight > Pawn
        const priorities: PieceType[] = [
            PieceType.QUEEN,
            PieceType.ROOK,
            PieceType.BISHOP,
            PieceType.KNIGHT,
            PieceType.PAWN,
        ];

        // Find all capture moves, grouped by captured piece type
        for (const type of priorities) {
            const captureMoves = availableMoves.filter((move) => {
                if (!isAttackingMove(move, board)) return false;
                const target = board[move.to.file][move.to.rank];
                return target && target.type === type;
            });
            if (captureMoves.length > 0) {
                // Pick randomly among highest-priority captures using lodash
                return _.sample(captureMoves)!;
            }
        }

        // No capture available, pick a random move
        return _.sample(availableMoves)!;
    }
}
