// Local copies of shared types to avoid module linking issues during development
import type { GameState, Player, Move, Board } from "game-engine";

export interface LobbyUserDto {
    id: number;
    name: string;
}

export interface LobbyDto {
    id: number;
    creatorName: string;
    users: LobbyUserDto[];
    moves: number;
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
    name: string;
    moves: number;
    gameState: GameState;
    creatorName: string;
    users: LobbyUserDto[];
    hasPassword: boolean;
}

export interface CreateLobbyDto {
    userId: string;
    name: string;
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