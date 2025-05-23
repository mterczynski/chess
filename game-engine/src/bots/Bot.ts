import { Board } from "../Board";
import { Move } from "../Moves";

export interface Bot {
    makeMove(board: Board, availableMoves: Move[]): Move;
}
