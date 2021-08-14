import { PieceType, Piece, King, Rook } from "../pieces";

export const isCastleablePieceType = (type: PieceType): type is PieceType.KING | PieceType.ROOK => {
    const castleablePieceTypes = [PieceType.ROOK, PieceType.KING];
    return castleablePieceTypes.includes(type);
}

export const isCastleablePiece = (piece: Piece): piece is King | Rook => {
    return isCastleablePieceType(piece.type);
}
