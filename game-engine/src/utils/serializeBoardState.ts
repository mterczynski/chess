import { Board } from "../Board";
import { Player } from "../Player";
import { ChessFile } from "../positions/ChessFile";

/**
 * Serializes the board, player turn into a string for repetition detection.
 * This is a simplified version and assumes castling/en passant are not yet tracked in detail.
 * Extend as needed for full FEN compatibility.
 */
export function serializeBoardState(
    board: Board,
    currentPlayer: Player
): string {
    let rows: string[] = [];
    for (let rank = 8; rank >= 1; rank--) {
        let row = "";
        for (const file of Object.values(ChessFile)) {
            const piece = board[file][rank - 1];
            if (!piece) {
                row += ".";
            } else {
                const code =
                    piece.player === Player.WHITE
                        ? piece.type[0]
                        : piece.type[0].toLowerCase();
                row += code;
            }
        }
        rows.push(row);
    }
    // Compose a string with board, player
    return `${rows.join("/")}_${currentPlayer}`;
}
