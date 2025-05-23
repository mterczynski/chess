import { Board } from "../Board";
import { EnPassantMove, Move, SpecialMoveType } from "../Moves";

export function isAttackingMove(move: Move, board: Board): boolean {
    if ((move as EnPassantMove).type === SpecialMoveType.EN_PASSANT) {
        // todo - improve - possibly add SpecialMoveType to NormalMove and remove it to MoveType
        return true;
    }

    const fromPiece = board[move.from.file][move.from.rank];
    if (!fromPiece) {
        throw new Error("Invalid move, source piece not found");
    }

    const target = board[move.to.file][move.to.rank];
    if (!target) return false;

    return target.player !== fromPiece.player;
}
