import { Position } from "./positions";
import { PromotablePieceType } from "./pieces";

export enum MoveType {
    STANDARD = "STANDARD",
    CASTLING = "CASTLING",
    PROMOTION = "PROMOTION",
    EN_PASSANT = "EN_PASSANT",
}

/** Includes basic attacking and non-attacking moves */
interface BaseMove {
    from: Position;
    to: Position;
    isAttacking: boolean;
    type: MoveType;
}

export interface StandardMove extends BaseMove {
    type: MoveType.STANDARD;
}

export interface EnPassantMove extends BaseMove {
    type: MoveType.EN_PASSANT;
    isAttacking: true;
}

export interface CastlingMove extends BaseMove {
    type: MoveType.CASTLING;
    isAttacking: false;
}

export interface PromotionMove extends BaseMove {
    type: MoveType.PROMOTION;
    promoteTo: PromotablePieceType;
}

export type Move = StandardMove | CastlingMove | PromotionMove | EnPassantMove;
