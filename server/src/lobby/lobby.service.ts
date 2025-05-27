import {
    Injectable,
    BadRequestException,
    ConflictException,
    NotFoundException,
    Inject,
    ForbiddenException,
} from "@nestjs/common";
import { Game, GameState } from "game-engine";
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
    private finishedLobbies: Lobby[] = [];
    private lobbySseSubjects: { [lobbyId: number]: Subject<LobbyUpdateDto> } =
        {};

    constructor(@Inject() private userService: UserService) {}

    createLobby(body: CreateLobbyDto) {
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
            playerSessions: [], // Start with empty session list
        });
        return { id: this.idCounter - 1, name: body.name };
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
            name: lobby.name,
            moves: lobby.gameInstance.getMoveHistory().length,
            gameState: lobby.gameInstance.getState(),
        }));
    }

    getLobby(id: string, password: string, sessionId?: string): LobbyDetailsDto {
        const lobbyId = Number(id);
        let lobby = this.lobbies.find((l) => l.id === lobbyId);
        if (!lobby) {
            lobby = this.finishedLobbies.find((l) => l.id === lobbyId);
            if (!lobby) {
                throw new NotFoundException("Lobby not found.");
            }
        }
        if (lobby.password !== password) {
            throw new ForbiddenException("Incorrect password.");
        }
        // Track player session (only for active lobbies)
        if (lobby && this.lobbies.includes(lobby) && sessionId) {
            if (!lobby.playerSessions.includes(sessionId)) {
                lobby.playerSessions.push(sessionId);
            }
            // If 2 players joined and game is UNSTARTED, start the game
            if (lobby.playerSessions.length === 2 && lobby.gameInstance.getState() === GameState.UNSTARTED) {
                (lobby.gameInstance as any).state = GameState.IN_PROGRESS;
            }
        }
        return {
            id: lobby.id,
            name: lobby.name,
            moves: lobby.gameInstance.getMoveHistory().length,
            gameState: lobby.gameInstance.getState(),
            currentPlayer: lobby.gameInstance.getCurrentPlayer(),
            board: lobby.gameInstance.getBoard?.() ?? null,
            availableMoves: lobby.gameInstance.getAvailableMovesForPlayer(),
            playerCount: lobby.playerSessions.length,
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
        // If game is over, move lobby to finishedLobbies and remove from active lobbies
        const gameState = lobby.gameInstance.getState();
        if (
            gameState === "WHITE_WON" ||
            gameState === "BLACK_WON" ||
            gameState.startsWith("DRAW")
        ) {
            this.finishedLobbies.push(lobby);
            this.lobbies = this.lobbies.filter((l) => l.id !== lobbyId);
        }
        return this.getLobby(id, body.password);
    }
}
