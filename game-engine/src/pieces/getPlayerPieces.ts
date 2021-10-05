import { Board } from "../Board";
import { Player } from "../Player";
import { ChessFile } from "../positions";
import { PieceWithPosition } from "./PieceWithPosition";

export function getPlayerPieces(board: Board, player: Player): PieceWithPosition[] {
    const pieces = Object.entries(board).flatMap(([fileName, fileContent]) => {
        return fileContent.map((piece, rank) => (piece === null ? null : {
            ...piece,
            position: {
                file: fileName as ChessFile,
                rank,
            }
        })).filter((square): square is PieceWithPosition => !!square)
    });

    return pieces.filter(piece => piece!.player === player);
}
