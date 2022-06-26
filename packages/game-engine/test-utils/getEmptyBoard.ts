import { Game } from "../src/Game";
import { Board } from "../src/Board";
import { Piece } from "../src/pieces";
import { ChessFile } from "../src/positions";

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
