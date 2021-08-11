import { GameState } from "./GameState";
import { Move } from "./Move";
import { Player } from "./Player";

export class GameEngine {
    private state: GameState = GameState.UNSTARTED;
    private currentPlayer: Player = Player.WHITE;

    getState() {
        return this.state;
    }

    move(move: Move) {
        // todo
    }

    /** null will be returned if the getter is called after the end of the game */
    getCurrentPlayer(): Player | null {
        if(this.isGameOver()) {
            return null;
        }

        return this.currentPlayer;
    }

    private isGameOver(): boolean {
        return this.state === GameState.WHITE_WON || this.state === GameState.BLACK_WON || this.state === GameState.DRAW
    }
}
