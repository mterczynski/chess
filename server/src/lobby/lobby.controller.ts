import { Controller, Post, Body, Get } from "@nestjs/common";
import { Game } from "game-engine";

@Controller("lobby")
export class LobbyController {
    private idCounter = 1;
    private lobbies: {
        id: number;
        name: string;
        password: string;
        gameInstance: Game;
    }[] = [];

    @Post()
    createLobby(@Body() body: { name: string; password: string }) {
        if (
            typeof body.name !== "string" ||
            typeof body.password !== "string"
        ) {
            return {
                success: false,
                message: "Name and password must be strings.",
            };
        }
        if (
            this.lobbies.some(
                (lobby) =>
                    lobby.name === body.name &&
                    lobby.password === body.password,
            )
        ) {
            return {
                success: false,
                message: "A lobby with this name and password already exists.",
            };
        }
        this.lobbies.push({
            id: this.idCounter++,
            name: body.name,
            password: body.password,
            gameInstance: new Game(),
        });
        return { success: true };
    }

    @Get()
    getLobbies() {
        return {
            success: true,
            lobbies: this.lobbies.map((lobby) => ({
                id: lobby.id,
                name: lobby.name,
                moves: lobby.gameInstance.getMoveHistory().length,
                gameState: lobby.gameInstance.getState(),
            })),
        };
    }
}
