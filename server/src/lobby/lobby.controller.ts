import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { Move } from "game-engine";
import { LobbyService } from "./lobby.service";

@Controller("lobby")
export class LobbyController {
    constructor(private readonly lobbyService: LobbyService) {}

    @Post()
    createLobby(@Body() body: { name: string; password: string }) {
        return this.lobbyService.createLobby(body);
    }

    @Get()
    getLobbies() {
        return this.lobbyService.getLobbies();
    }

    @Get(":id")
    getLobby(@Param("id") id: string) {
        return this.lobbyService.getLobby(id);
    }

    @Post(":id/move")
    move(
        @Param("id") id: string,
        @Body() body: { move: Move; password: string },
    ) {
        return this.lobbyService.move(id, body);
    }
}
