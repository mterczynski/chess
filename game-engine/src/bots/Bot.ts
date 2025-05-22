import { Board } from "../Board";
import { Move } from "../Moves";
import { Player } from "../Player";

export interface Bot {
    makeMove(board: Board, availableMoves: Move[], botColor: Player): Move;
}
