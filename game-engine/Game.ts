import _ from "lodash";
import { AvailableMoveCalculator } from "./availableMovesCalculation";
import { Board } from "./Board";
import { isCastleablePiece } from "./castling";
import { createNewBoard } from "./createNewBoard";
import { GameState } from "./GameState";
import { Move } from "./Move";
import { Piece } from "./pieces";
import { Player } from "./Player";

export class Game {
    static readonly boardSize = 8;
    private state: GameState = GameState.UNSTARTED;
    private currentPlayer: Player = Player.WHITE;
    private board: Board = createNewBoard();
    private lastMove: Move | null = null;

    constructor(
        private readonly availableMoveCalculator: AvailableMoveCalculator = new AvailableMoveCalculator(),
    ) {}

    getState(): GameState {
        return this.state;
    }

    /** Returns clone of original board */
    getBoard(): Board {
        return _.cloneDeep(this.board);
    }

    move(move: Move): void {
        if(this.isValidMove(move)) {
            this.applyMove(move);
            this.changePlayer();
        } else {
            throw new Error('Invalid move');
        }
    }

    getAvailableMovesForPlayer(): Move[] {
        return this.availableMoveCalculator.getAvailableMovesForPlayer(this.board, this.currentPlayer, this.lastMove);
    }

    getCurrentPlayer(): Player | null {
        if(this.isGameOver()) {
            return null;
        }

        return this.currentPlayer;
    }

    private changePlayer(): void {
        if(this.currentPlayer === Player.WHITE) {
            this.currentPlayer = Player.BLACK;
        } else {
            this.currentPlayer = Player.WHITE;
        }
    }

    private isGameOver(): boolean {
        return this.state === GameState.WHITE_WON || this.state === GameState.BLACK_WON || this.state === GameState.DRAW
    }

    private isValidMove(move: Move): boolean {
        return this.hasMove(this.getAvailableMovesForPlayer(), move);
    }

    private hasMove(moves: Move[], move: Move): boolean {
        return moves
            .filter(_move => _move.from.file === move.from.file)
            .filter(_move => _move.from.rank === move.from.rank)
            .filter(_move => _move.to.file === move.to.file)
            .filter(_move => _move.to.rank === move.to.rank)
            .length >= 1;
    }

    private applyMove(move: Move): void {
        const piece = this.board[move.from.file][move.from.rank] as Piece;
        this.board[move.to.file][move.to.rank] = piece;
        this.board[move.from.file][move.from.rank] = null;

        if(isCastleablePiece(piece)) {
            piece.hasMoved = true;
        }
    }
}
