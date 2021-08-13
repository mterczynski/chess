import { Board } from "./Board";
import { GameState } from "./GameState";
import { Move } from "./Move";
import { Player } from "./Player";
import { ChessFile } from "./positions";

export class Game {
    private state: GameState = GameState.UNSTARTED;
    private currentPlayer: Player = Player.WHITE;
    private hasWhiteCastled = false;
    private hasBlackCastled = false;
    private board: Board = this.createBoard();

    getState(): GameState {
        return this.state;
    }

    move(move: Move): void {
        if(this.isValidMove(move)) {
            this.makeMove(move);
            this.changePlayer();
        } else {
            throw new Error('Invalid move');
        }
    }

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

    private createBoard(): Board {
        return {
            [ChessFile.A]: [],
            [ChessFile.B]: [],
            [ChessFile.C]: [],
            [ChessFile.D]: [],
            [ChessFile.E]: [],
            [ChessFile.F]: [],
            [ChessFile.G]: [],
            [ChessFile.H]: [],
        }
    }
}
