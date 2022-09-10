import { Game, GameState, Player } from "game-engine";

export function handleGameEnd(game: Game, playerSide: Player) {
    const isDraw = [
        GameState.DRAW_BY_50_MOVE_RULE,
        GameState.DRAW_BY_75_MOVE_RULE,
        GameState.DRAW_BY_AGREEMENT,
        GameState.DRAW_BY_INSUFFICIENT_MATERIAL,
        GameState.DRAW_BY_REPETITION,
        GameState.DRAW_BY_STALEMATE,
    ].includes(game.getState());

    if (playerSide === Player.WHITE) {
        if (game.getState() === GameState.WHITE_WON) {
            alert("You won");
        } else if (game.getState() === GameState.BLACK_WON) {
            alert("You lost");
        } else if (isDraw) {
            alert("Game drawn"); // TODO - add more descriptive messages that mention draw reason
        }
    } else {
        // TODO
    }
}
