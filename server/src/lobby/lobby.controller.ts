import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Sse,
    Headers,
    UseGuards,
    Req,
} from "@nestjs/common";
import { Move } from "game-engine";
import { LobbyService } from "./lobby.service";
import { map, Observable } from "rxjs";
import { JwtAuthGuard } from "../user/jwt-auth.guard";
import { LobbyUpdateDto } from "chess-shared";

@Controller("lobby")
export class LobbyController {
    constructor(private readonly lobbyService: LobbyService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    createLobby(@Req() req, @Body() body: { name: string; password?: string }) {
        // userId from JWT
        const userId = req.user?.sub;
        if (!userId) throw new Error("No userId in JWT");
        return this.lobbyService.createLobby({
            ...body,
            userId: userId.toString(),
        });
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
        @Headers("x-lobby-password") password: string,
    ): Observable<{ data: LobbyUpdateDto }> {
        // Validate password before subscribing to SSE
        this.lobbyService.getLobby(id, password); // Throws if invalid
        return this.lobbyService.getLobbySseObservable(id).pipe(
            map((data) => {
                return { data };
            }),
        );
    }
}
