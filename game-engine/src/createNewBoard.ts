import { Board } from "./Board";
import { PieceType, Piece } from "./pieces";
import { createPawn, createPiece } from "./pieces/PieceFactory";
import { Player } from "./Player";
import { ChessFile } from "./positions";

export function createNewBoard(): Board {
    const createSymetricalFile = (pieceType: PieceType): (Piece | null)[] => {
        return [
            null,
            createPiece(pieceType, Player.WHITE),
            createPawn(Player.WHITE),
            null,
            null,
            null,
            null,
            createPawn(Player.BLACK),
            createPiece(pieceType, Player.BLACK),
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
