import { Position } from "./positions";
import { PromotablePieceType } from "./PromotablePieceType";

export enum SpecialMoveType {
    CASTLE = 'CASTLE',
    PROMOTION = 'PROMOTION',
    EN_PASSANT = 'EN_PASSANT',
}

/** Includes basic attacking and non-attacking moves */
export interface NormalMove {
    from: Position,
    to: Position,
}

export interface EnPassantMove extends NormalMove {
    type: SpecialMoveType.EN_PASSANT;
}

export interface CastleMove extends NormalMove {
    type: SpecialMoveType.CASTLE,
}

export interface PromotionMove extends NormalMove {
    type: SpecialMoveType.PROMOTION,
    promoteTo: PromotablePieceType,
}

export type Move = NormalMove | CastleMove | PromotionMove | EnPassantMove;
