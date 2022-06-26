import _ from "lodash";
import { AvailableMoveCalculator } from "./availableMovesCalculation";
import { CheckCalculator } from "./availableMovesCalculation/CheckCalculator";
import { Board } from "./Board";
import { createNewBoard } from "./utils";
import { GameState } from "./GameState";
import { isCastleablePiece, negatePlayer } from "./utils";
import { Move } from "./Moves";
import { Piece } from "./pieces";
import { Player } from "./Player";
import { arePositionsEqual } from "./positions";

export class Game {
    static readonly boardSize = 8;
    private isMoveValidatorEnabled = true;
    private state: GameState = GameState.UNSTARTED;
    private currentPlayer: Player = Player.WHITE;
    private board: Board = createNewBoard();
    private moves: Move[] = [];

    constructor(
        private readonly checkCalculator = new CheckCalculator(),
        private readonly availableMoveCalculator: AvailableMoveCalculator = new AvailableMoveCalculator(checkCalculator),
    ) { }

    disableMoveValidityChecking(): void {
        this.isMoveValidatorEnabled = false;
    }

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

        if (this.isMoveValidatorEnabled && !this.isValidMove(move)) {
            throw new Error('Invalid move');
        }

        this.applyMove(move);
        this.state = this.getNewGameStateAfterMove();

        if (this.state === GameState.IN_PROGRESS) {
            this.changePlayer();
        }
    }

    getAvailableMovesForPlayer(): Move[] {
        return this.availableMoveCalculator.getAvailableMovesForPlayer(this.board, this.currentPlayer, this.getLastMove());
    }

    getCurrentPlayer(): Player | null {
        if (this.isGameOver()) {
            return null;
        }

        return this.currentPlayer;
    }

    clone(): Game {
        const clone = new Game();
        clone.isMoveValidatorEnabled = this.isMoveValidatorEnabled;
        clone.state = this.state;
        clone.currentPlayer = this.currentPlayer
        clone.board = _.cloneDeep(this.board);
        clone.moves = _.cloneDeep(this.moves);

        return clone;
    }

    private getLastMove(): Move | null {
        return this.moves.slice(-1)[0] || null;
    }

    private changePlayer(): void {
        this.currentPlayer = this.currentPlayer === Player.WHITE ?
            Player.BLACK :
            Player.WHITE;
    }

    private isGameOver(): boolean {
        const draws = [GameState.DRAW_BY_50_MOVE_RULE, GameState.DRAW_BY_75_MOVE_RULE, GameState.DRAW_BY_AGREEMENT,
        GameState.DRAW_BY_INSUFFICIENT_MATERIAL, GameState.DRAW_BY_REPETITION, GameState.DRAW_BY_STALEMATE];

        return [GameState.WHITE_WON, GameState.BLACK_WON, ...draws].includes(this.state);
    }

    private isValidMove(move: Move): boolean {
        const availableMoves = this.getAvailableMovesForPlayer();
        return availableMoves.some(availableMove =>
            arePositionsEqual(availableMove.from, move.from) &&
            arePositionsEqual(availableMove.to, move.to)
        );
    }

    private applyMove(move: Move): void {
        const piece = this.board[move.from.file][move.from.rank] as Piece;
        this.board[move.to.file][move.to.rank] = piece;
        this.board[move.from.file][move.from.rank] = null;

        if (isCastleablePiece(piece)) {
            piece.hasMoved = true;
        }

        this.moves.push(move);
    }

    // todo - extract to separate class (?)
    // maybe extract it to a class called GameStateHandler (?)
    private getNewGameStateAfterMove(): GameState {
        if (this.state === GameState.UNSTARTED) {
            return GameState.IN_PROGRESS;
        }

        const enemy = negatePlayer(this.currentPlayer);
        const enemyMoves = this.availableMoveCalculator.getAvailableMovesForPlayer(this.board, enemy, this.getLastMove());

        if (enemyMoves.length === 0) {
            const availableCurrentPlayerMoves = this.availableMoveCalculator.getAvailableMovesForPlayer(this.board, this.currentPlayer, this.getLastMove());

            const checkingPiecesOfCurrentPlayer = this.checkCalculator.getCheckingEnemyPieces(enemy, this.board, availableCurrentPlayerMoves);

            if (checkingPiecesOfCurrentPlayer.length === 0) {
                return GameState.DRAW_BY_STALEMATE;
            } else {
                return this.currentPlayer === Player.WHITE ?
                    GameState.WHITE_WON :
                    GameState.BLACK_WON;
            }
        }

        return this.state;
    }
}
