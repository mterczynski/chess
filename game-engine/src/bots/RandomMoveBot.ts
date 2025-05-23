import { Board } from "../Board";
import { Move } from "../Moves";
import { Player } from "../Player";
import { Bot } from "./Bot";

export class RandomMoveBot implements Bot {
    /**
     * Selects a random move from the list of available moves.
     * @returns A randomly selected Move.
     */
    makeMove(board: Board, availableMoves: Move[], botColor: Player): Move {
        if (!availableMoves || availableMoves.length === 0) {
            throw new Error("No available moves");
        }
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    }
}
