import { CastleMove, Move, SpecialMoveType } from "../Moves";

export function isCastleMove(move: Move): move is CastleMove {
    return (move as CastleMove).type === SpecialMoveType.CASTLE;
}
