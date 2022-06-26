import { Piece, King, Rook } from "../pieces";
import { isCastleablePieceType } from "./isCastleablePieceType";

export const isCastleablePiece = (piece: Piece): piece is King | Rook => {
    return isCastleablePieceType(piece.type);
}
