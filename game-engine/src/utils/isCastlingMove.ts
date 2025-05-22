import { CastlingMove, Move, MoveType } from "../Moves";

export function isCastlingMove(move: Move): move is CastlingMove {
    return (move as CastlingMove).type === MoveType.CASTLING;
}
