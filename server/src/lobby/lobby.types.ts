import { Game } from "game-engine";
import { User } from "../../entities";

export interface Lobby {
    id: number;
    password?: string;
    gameInstance: Game;
    users: User[];
}
