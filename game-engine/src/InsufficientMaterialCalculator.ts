import { Board } from "./Board";
import { PieceType } from "./pieces";
import type { Piece } from "./pieces";
import { ChessFile } from "./positions";

/**
 * Utility to check for insufficient material (no possible checkmate).
 */
export class InsufficientMaterialCalculator {
    /**
     * Returns true if neither side has sufficient material to checkmate.
     */
    static isInsufficientMaterial(board: Board): boolean {
        const pieces: Piece[] = Object.values(board)
            .flat()
            .filter((piece): piece is Piece => Boolean(piece));

        return (
            this.onlyKings(pieces) ||
            this.kingAndMinorVsKing(pieces) ||
            this.kingBishopVsKingBishopSameColor(pieces, board)
        );
    }

    private static onlyKings(pieces: Piece[]): boolean {
        return (
            pieces.length === 2 &&
            pieces.every((piece) => piece.type === PieceType.KING)
        );
    }

    private static kingAndMinorVsKing(pieces: Piece[]): boolean {
        return (
            pieces.length === 3 &&
            pieces.filter((piece) => piece.type === PieceType.KING).length ===
                2 &&
            (pieces.some((piece) => piece.type === PieceType.BISHOP) ||
                pieces.some((piece) => piece.type === PieceType.KNIGHT))
        );
    }

    private static kingBishopVsKingBishopSameColor(
        pieces: Piece[],
        board?: Board,
    ): boolean {
        if (
            pieces.length === 4 &&
            pieces.filter((piece) => piece.type === PieceType.KING).length ===
                2 &&
            pieces.filter((piece) => piece.type === PieceType.BISHOP).length ===
                2
        ) {
            if (!board) return false;
            // Find bishops and their positions from the board
            const bishops: { file: string; rank: number }[] = [];
            for (const file of Object.values(ChessFile)) {
                for (let rank = 1; rank <= 8; rank++) {
                    const piece = board[file][rank];
                    if (piece && piece.type === PieceType.BISHOP) {
                        bishops.push({ file, rank });
                    }
                }
            }
            if (bishops.length === 2) {
                const colors = bishops.map(
                    (bishop) => (bishop.file.charCodeAt(0) + bishop.rank) % 2,
                );
                if (colors[0] === colors[1]) {
                    return true;
                }
            }
        }
        return false;
    }
}
