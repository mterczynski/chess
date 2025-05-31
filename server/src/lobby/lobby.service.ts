import {
    Injectable,
    BadRequestException,
    ConflictException,
    NotFoundException,
    Inject,
    ForbiddenException,
} from "@nestjs/common";
import { Game } from "game-engine";
import { Observable, Subject } from "rxjs";
import {
    CreateLobbyDto,
    Lobby,
    LobbyDetailsDto,
    LobbySummaryDto,
    LobbyUpdateDto,
    MoveDto,
} from "./lobby.types";
import { UserService } from "../user";

@Injectable()
export class LobbyService {
    private idCounter = 1;
    private lobbies: Lobby[] = [];
    private lobbySseSubjects: { [lobbyId: number]: Subject<LobbyUpdateDto> } =
        {};

    constructor(@Inject() private userService: UserService) {}

    async createLobby(body: CreateLobbyDto) {
        // userId is now always injected from controller, not from client
        if (!body.userId || isNaN(Number(body.userId))) {
            throw new BadRequestException(
                "userId is required and must be a valid number",
            );
        }
        const user = await this.userService.getUserById(Number(body.userId));

        if (!user) {
            throw new NotFoundException("User with provided id not found");
        }
        if (body.password && typeof body.password !== "string") {
            throw new BadRequestException(
                "Password must be a string if provided.",
            );
        }
        this.lobbies.push({
            id: this.idCounter++,
            password: body.password,
            gameInstance: new Game(),
            users: [user],
        });

        return { id: this.idCounter - 1 };
    }

    // todo - cover with unit test
    getLobbySseObservable(id: string): Observable<LobbyUpdateDto> {
        const lobbyId = Number(id);
        if (!this.lobbySseSubjects[lobbyId]) {
            this.lobbySseSubjects[lobbyId] = new Subject();
        }

        return this.lobbySseSubjects[lobbyId].asObservable();
    }

    getLobbies(): LobbySummaryDto[] {
        return this.lobbies.map((lobby) => ({
            id: lobby.id,
            moves: lobby.gameInstance.getMoveHistory().length,
            gameState: lobby.gameInstance.getState(),
            users: lobby.users,
        }));
    }

    getLobby(id: string, password: string): LobbyDetailsDto {
        const lobbyId = Number(id);
        const lobby = this.lobbies.find((l) => l.id === lobbyId);
        if (!lobby) {
            throw new NotFoundException("Lobby not found.");
        }

        if (lobby.password !== password) {
            throw new ForbiddenException("Incorrect password.");
        }

        return {
            id: lobby.id,
            moves: lobby.gameInstance.getMoveHistory().length,
            gameState: lobby.gameInstance.getState(),
            currentPlayer: lobby.gameInstance.getCurrentPlayer(),
            board: lobby.gameInstance.getBoard?.() ?? null,
            availableMoves: lobby.gameInstance.getAvailableMovesForPlayer(),
        };
    }

    move(id: string, body: MoveDto) {
        const lobbyId = Number(id);
        const lobby = this.lobbies.find((l) => l.id === lobbyId);
        if (!lobby) {
            throw new NotFoundException("Lobby not found.");
        }
        if (lobby.password !== body.password) {
            throw new BadRequestException("Incorrect password.");
        }
        try {
            lobby.gameInstance.move(body.move);
        } catch (e) {
            throw new BadRequestException("Invalid move");
        }
        // Notify all SSE subscribers about the new move
        const updatedLobby = this.getLobby(id, body.password);

        if (this.lobbySseSubjects[lobbyId]) {
            this.lobbySseSubjects[lobbyId].next({
                move: body.move,
                lobby: updatedLobby,
            });
        }

        return this.getLobby(id, body.password);
    }
}
