import { Figure } from "./figures";
import { GameState } from "./GameState";
import { Move } from "./Move";
import { Player } from "./Player";

export class Game {
    private state: GameState = GameState.UNSTARTED;
    private currentPlayer: Player = Player.WHITE;
    /** Array of ranks, each rank is an array representing each square in rank,
     *  first rank in the board array is the 8th rank, the last one is the 1st rank.
     *  In each rank, the first item represents square on A file, the last item represents square on H file
     * Reference image: https://upload.wikimedia.org/wikipedia/commons/2/2c/AAA_SVG_Chessboard_and_chess_pieces_02.svg
     */
    private board: Figure[][] = this.createBoard();

    getState() {
        return this.state;
    }

    move(move: Move) {
        if(this.isValidMove(move)) {
            this.makeMove(move);
            this.changePlayer();
        } else {
            throw new Error('Invalid move');
        }
    }

    /** null will be returned if the getter is called after the end of the game */
    getCurrentPlayer(): Player | null {
        if(this.isGameOver()) {
            return null;
        }

        return this.currentPlayer;
    }

    private changePlayer(): void {
        if(this.currentPlayer === Player.WHITE) {
            this.currentPlayer = Player.BLACK;
        } else {
            this.currentPlayer = Player.WHITE;
        }
    }

    private isGameOver(): boolean {
        return this.state === GameState.WHITE_WON || this.state === GameState.BLACK_WON || this.state === GameState.DRAW
    }

    private isValidMove(move: Move): boolean {
        // todo
        return true;
    }

    private makeMove(move: Move): void {
        // todo
    }

    private createBoard(): Figure[][] {
        return [
            [{player: Player.BLACK, }]
        ];
    }
}
