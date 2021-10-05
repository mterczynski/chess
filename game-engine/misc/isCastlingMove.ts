import { CastlingMove, Move, SpecialMoveType } from "../Moves";

export function isCastlingMove(move: Move): move is CastlingMove {
    return (move as CastlingMove).type === SpecialMoveType.CASTLING;
}
