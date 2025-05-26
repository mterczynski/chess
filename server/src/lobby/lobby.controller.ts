import { Controller, Post, Body, Get, Param, Sse } from "@nestjs/common";
import { Move } from "game-engine";
import { LobbyService } from "./lobby.service";
import { map, Observable } from "rxjs";
import { CreateLobbyDto, LobbyUpdateDto } from "./lobby.types";

@Controller("lobby")
export class LobbyController {
    constructor(private readonly lobbyService: LobbyService) {}

    @Post()
    createLobby(@Body() body: CreateLobbyDto) {
        return this.lobbyService.createLobby(body);
    }

    @Get()
    getLobbies() {
        return this.lobbyService.getLobbies();
    }

    // Change to POST to allow password in body
    @Post(":id")
    getLobby(@Param("id") id: string, @Body() body: { password: string }) {
        return this.lobbyService.getLobby(id, body.password);
    }

    @Post(":id/move")
    move(
        @Param("id") id: string,
        @Body() body: { move: Move; password: string },
    ) {
        return this.lobbyService.move(id, body);
    }

    @Sse(":id/game-updates")
    sseLobbyMoves(
        @Param("id") id: string,
    ): Observable<{ data: LobbyUpdateDto }> {
        return this.lobbyService.getLobbySseObservable(id).pipe(
            map((data) => {
                return { data };
            }),
        );
    }
}
