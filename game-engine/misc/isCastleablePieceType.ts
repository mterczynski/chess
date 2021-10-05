import { PieceType } from "../pieces";

export const isCastleablePieceType = (type: PieceType): type is PieceType.KING | PieceType.ROOK => {
    const castleablePieceTypes = [PieceType.ROOK, PieceType.KING];
    return castleablePieceTypes.includes(type);
}
