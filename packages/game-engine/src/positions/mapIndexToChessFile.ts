import { Game } from "../Game";
import { ChessFile } from "./index";

export const mapIndexToChessFile = (index: number): ChessFile => {
    if (index < 0 || index > Game.boardSize - 1) {
        throw new Error('Invalid index');
    }

    return [...Object.values(ChessFile)][index];
}
