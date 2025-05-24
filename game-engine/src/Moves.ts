import { Position } from "./positions";
import { PromotablePieceType } from "./pieces";

export enum SpecialMoveType {
    CASTLING = 'CASTLING',
    PROMOTION = 'PROMOTION',
    EN_PASSANT = 'EN_PASSANT',
}

/** Includes basic attacking and non-attacking moves */
export interface NormalMove {
    from: Position,
    to: Position,
    /** Optional: true if this move attacks an enemy piece */
    isAttacking?: boolean;
    /** Optional: type of move, e.g. 'STANDARD' */
    type?: string;
}

export interface EnPassantMove extends NormalMove {
    type: SpecialMoveType.EN_PASSANT;
}

export interface CastlingMove extends NormalMove {
    type: SpecialMoveType.CASTLING,
}

export interface PromotionMove extends NormalMove {
    type: SpecialMoveType.PROMOTION,
    promoteTo: PromotablePieceType,
}

export type Move = NormalMove | CastlingMove | PromotionMove | EnPassantMove;
