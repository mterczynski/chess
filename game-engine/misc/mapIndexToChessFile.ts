import { Game } from "..";
import { ChessFile } from "../positions";

export const mapIndexToChessFile = (index: number): ChessFile => {
    if(index < 0 || index > Game.boardSize - 1) {
        throw new Error('Invalid index');
    }

    return [...Object.values(ChessFile)][index];
}
