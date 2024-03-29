import { GameState, Player } from "game-engine";

export function handleGameEnd(gameState: GameState, playerSelection: Player) {
    const isDraw = [
        GameState.DRAW_BY_50_MOVE_RULE,
        GameState.DRAW_BY_75_MOVE_RULE,
        GameState.DRAW_BY_AGREEMENT,
        GameState.DRAW_BY_INSUFFICIENT_MATERIAL,
        GameState.DRAW_BY_REPETITION,
        GameState.DRAW_BY_STALEMATE,
    ].includes(gameState);

    if (gameState === GameState.DRAW_BY_50_MOVE_RULE) {
        return alert("Draw by 50 move rule");
    } else if (gameState === GameState.DRAW_BY_75_MOVE_RULE) {
        return alert("Draw by 75 move rule");
    } else if (gameState === GameState.DRAW_BY_AGREEMENT) {
        return alert("Draw by agreement");
    } else if (gameState === GameState.DRAW_BY_INSUFFICIENT_MATERIAL) {
        return alert("Draw by insufficient material");
    } else if (gameState === GameState.DRAW_BY_REPETITION) {
        return alert("Draw by repetition");
    } else if (gameState === GameState.DRAW_BY_STALEMATE) {
        return alert("Draw by stalemate");
    }

    if (playerSelection === Player.WHITE) {
        if (gameState === GameState.WHITE_WON) {
            alert("You won");
        } else if (gameState === GameState.BLACK_WON) {
            alert("You lost");
        } else if (isDraw) {
            alert("Game drawn"); // TODO - add more descriptive messages that mention draw reason
        }
    } else {
        if (gameState === GameState.BLACK_WON) {
            alert("You won");
        } else if (gameState === GameState.WHITE_WON) {
            alert("You lost");
        } else if (isDraw) {
            alert("Game drawn"); // TODO - add more descriptive messages that mention draw reason
        }
    }
}
