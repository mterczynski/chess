import { Board } from "../Board";
import { Move } from "../Moves";
import { PieceType } from "../pieces";
import { Player } from "../Player";

export class CaptureIfAvailableBot {
    /**
     * Selects a capture move if available, prioritizing captures in this order:
     * Queen > Rook > Bishop/Knight > Pawn. If no capture is available, picks a random move.
     */
    makeMove(board: Board, availableMoves: Move[], botColor: Player): Move {
        if (!availableMoves || availableMoves.length === 0) {
            throw new Error("No available moves");
        }

        // Helper to get the piece type at a given position
        const getPieceTypeAt = (move: Move) => {
            const target = board[move.to.file][move.to.rank];
            return target ? target.type : null;
        };

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
                // Only consider moves that attack an enemy piece
                const target = board[move.to.file][move.to.rank];
                return (
                    target && target.player !== botColor && target.type === type
                );
            });
            if (captureMoves.length > 0) {
                // Pick randomly among highest-priority captures
                const idx = Math.floor(Math.random() * captureMoves.length);
                return captureMoves[idx];
            }
        }

        // No capture available, pick a random move
        const idx = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[idx];
    }
}
