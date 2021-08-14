import { Game } from "..";
import { Board } from "../Board";
import { Piece } from "../pieces";
import { ChessFile } from "../positions";

export const getEmptyBoard = (): Board => {
    const getEmptyFile = (): (Piece | null)[] => Array(Game.boardSize + 1).fill(null);

    return {
        [ChessFile.A]: getEmptyFile(),
        [ChessFile.B]: getEmptyFile(),
        [ChessFile.C]: getEmptyFile(),
        [ChessFile.D]: getEmptyFile(),
        [ChessFile.E]: getEmptyFile(),
        [ChessFile.F]: getEmptyFile(),
        [ChessFile.G]: getEmptyFile(),
        [ChessFile.H]: getEmptyFile(),
    }
}
