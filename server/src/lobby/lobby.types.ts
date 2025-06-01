import { Game } from "game-engine";
import { User } from "src/user/user";

export interface Lobby {
    id: number;
    password?: string;
    gameInstance: Game;
    users: User[];
}
