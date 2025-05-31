import { Board, Game, GameState, Move, Player } from "game-engine";
import { User } from "src/user/user";

export interface Lobby {
    id: number;
    password?: string;
    gameInstance: Game;
    users: User[];
}

export interface LobbyDetailsDto {
    id: number;
    moves: number;
    gameState: GameState;
    currentPlayer: Player | null;
    board: Board;
    availableMoves: Move[];
}

export interface LobbySummaryDto {
    id: number;
    moves: number;
    gameState: GameState;
}

export interface CreateLobbyDto {
    // userId is now injected from controller, not from client
    userId: string;
    password?: string;
}

export interface MoveDto {
    move: Move;
    password: string;
}

export interface LobbyUpdateDto {
    move: Move;
    lobby: LobbyDetailsDto;
}
