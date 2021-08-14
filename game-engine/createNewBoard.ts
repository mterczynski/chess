import { Board } from "./Board";
import { PieceType, Piece } from "./pieces";
import { PieceFactory } from "./pieces/PieceFactory";
import { Player } from "./Player";
import { ChessFile } from "./positions";

export function createNewBoard(): Board {
    const pieceFactory = new PieceFactory();

    const createSymetricalFile = (pieceType: PieceType): (Piece | null)[] => {
        return [
            null,
            pieceFactory.createPiece(pieceType, Player.WHITE),
            pieceFactory.createPiece(PieceType.PAWN, Player.WHITE),
            null,
            null,
            null,
            null,
            pieceFactory.createPiece(PieceType.PAWN, Player.BLACK),
            pieceFactory.createPiece(pieceType, Player.BLACK)
        ]
    }

    return {
        [ChessFile.A]: createSymetricalFile(PieceType.ROOK),
        [ChessFile.B]: createSymetricalFile(PieceType.KNIGHT),
        [ChessFile.C]: createSymetricalFile(PieceType.BISHOP),
        [ChessFile.D]: createSymetricalFile(PieceType.QUEEN),
        [ChessFile.E]: createSymetricalFile(PieceType.KING),
        [ChessFile.F]: createSymetricalFile(PieceType.BISHOP),
        [ChessFile.G]: createSymetricalFile(PieceType.KNIGHT),
        [ChessFile.H]: createSymetricalFile(PieceType.ROOK),
    }
}
