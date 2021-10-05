import _ from "lodash";
import { AvailableMoveCalculator } from "./availableMovesCalculation";
import { CheckCalculator } from "./availableMovesCalculation/CheckCalculator";
import { Board } from "./Board";
import { createNewBoard } from "./createNewBoard";
import { GameState } from "./GameState";
import { isCastleablePiece, negatePlayer } from "./utils";
import { Move } from "./Moves";
import { Piece } from "./pieces";
import { Player } from "./Player";

export class Game {
    static readonly boardSize = 8;
    private state: GameState = GameState.UNSTARTED;
    private currentPlayer: Player = Player.WHITE;
    private board: Board = createNewBoard();
    private lastMove: Move | null = null;

    constructor(
        private readonly checkCalculator = new CheckCalculator(),
        private readonly availableMoveCalculator: AvailableMoveCalculator = new AvailableMoveCalculator(checkCalculator),
    ) { }

    getState(): GameState {
        return this.state;
    }

    /** Returns clone of the original board */
    getBoard(): Board {
        return _.cloneDeep(this.board);
    }

    move(move: Move): void {
        if (this.isGameOver()) {
            throw new Error('Game has already finished, no more moves can be made');
        }

        if (!this.isValidMove(move)) {
            throw new Error('Invalid move');
        }

        this.applyMove(move);
        this.updateStateAfterMove();

        if (this.state === GameState.IN_PROGRESS) {
            this.changePlayer();
        }
    }

    getAvailableMovesForPlayer(): Move[] {
        return this.availableMoveCalculator.getAvailableMovesForPlayer(this.board, this.currentPlayer, this.lastMove);
    }

    getCurrentPlayer(): Player | null {
        if (this.isGameOver()) {
            return null;
        }

        return this.currentPlayer;
    }

    private changePlayer(): void {
        if (this.currentPlayer === Player.WHITE) {
            this.currentPlayer = Player.BLACK;
        } else {
            this.currentPlayer = Player.WHITE;
        }
    }

    private isGameOver(): boolean {
        return [GameState.WHITE_WON, GameState.BLACK_WON, GameState.DRAW].includes(this.state);
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

        if (isCastleablePiece(piece)) {
            piece.hasMoved = true;
        }
    }

    private updateStateAfterMove(): void {
        if (this.state === GameState.UNSTARTED) {
            this.state = GameState.IN_PROGRESS;
            return;
        }

        const enemy = negatePlayer(this.currentPlayer);
        const enemyMoves = this.availableMoveCalculator.getAvailableMovesForPlayer(this.board, enemy, this.lastMove);

        if (enemyMoves.length === 0) {
            const availableCurrentPlayerMoves = this.availableMoveCalculator.getAvailableMovesForPlayer(this.board, this.currentPlayer, this.lastMove);

            const checkingPiecesOfCurrentPlayer = this.checkCalculator.getCheckingEnemyPieces(enemy, this.board, availableCurrentPlayerMoves);

            if (checkingPiecesOfCurrentPlayer.length === 0) {
                this.state = GameState.DRAW;
            } else {
                this.state = this.currentPlayer === Player.WHITE ?
                    GameState.WHITE_WON :
                    GameState.BLACK_WON;
            }
        }
    }
}
