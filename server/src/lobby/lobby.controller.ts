import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    BadRequestException,
    ConflictException,
    NotFoundException,
} from "@nestjs/common";
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
            throw new BadRequestException("Name and password must be strings.");
        }
        if (
            this.lobbies.some(
                (lobby) =>
                    lobby.name === body.name &&
                    lobby.password === body.password,
            )
        ) {
            throw new ConflictException(
                "A lobby with this name and password already exists.",
            );
        }
        this.lobbies.push({
            id: this.idCounter++,
            name: body.name,
            password: body.password,
            gameInstance: new Game(),
        });
        return { id: this.idCounter - 1, name: body.name };
    }

    @Get()
    getLobbies() {
        return this.lobbies.map((lobby) => ({
            id: lobby.id,
            name: lobby.name,
            moves: lobby.gameInstance.getMoveHistory().length,
            gameState: lobby.gameInstance.getState(),
        }));
    }

    @Get(":id")
    getLobby(@Param("id") id: string) {
        const lobbyId = Number(id);
        const lobby = this.lobbies.find((l) => l.id === lobbyId);
        if (!lobby) {
            throw new NotFoundException("Lobby not found.");
        }
        return {
            id: lobby.id,
            name: lobby.name,
            moves: lobby.gameInstance.getMoveHistory().length,
            gameState: lobby.gameInstance.getState(),
        };
    }

    // todo
    @Post(":id/move")
    move(@Param("id") id: string) {
        // 1. find lobby by id
        // 2. call game.move
        // 3. return success false if game.move throws
        // 4. return lobby using this.getLobby(id)
    }
}
