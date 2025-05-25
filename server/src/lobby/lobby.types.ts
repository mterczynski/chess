import { Board, Game, GameState, Move, Player } from "game-engine";
import { User } from "src/user/user";

export interface Lobby {
    id: number;
    name: string;
    password: string;
    gameInstance: Game;
    users: User[];
}

export interface LobbyDetailsDto {
    id: number;
    name: string;
    moves: number;
    gameState: GameState;
    currentPlayer: Player | null;
    board: Board;
    availableMoves: Move[];
}

export interface LobbySummaryDto {
    id: number;
    name: string;
    moves: number;
    gameState: GameState;
}

export interface CreateLobbyDto {
    userId: string;
    name: string;
    password: string;
}

export interface MoveDto {
    move: Move;
    password: string;
}

export interface LobbyUpdateDto {
    move: Move;
    lobby: LobbyDetailsDto;
}
