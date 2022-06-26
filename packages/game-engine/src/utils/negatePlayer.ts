import { Player } from "../Player";

export function negatePlayer(player: Player): Player {
    if(player === Player.WHITE) {
        return Player.BLACK;
    } else {
        return Player.WHITE;
    }
}
