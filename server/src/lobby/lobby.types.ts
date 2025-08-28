import { Game } from "game-engine";
import { User } from "src/user/user";

export interface Lobby {
    id: number;
    name: string;
    password?: string;
    gameInstance: Game;
    users: User[];
}
