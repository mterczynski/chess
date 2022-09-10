import _ from "lodash";
import { AvailableMoveCalculator } from "./availableMovesCalculation";
import { CheckCalculator } from "./availableMovesCalculation/CheckCalculator";
import { Board } from "./Board";
import { createNewBoard } from "./utils";
import { GameState } from "./GameState";
import { isCastleablePiece, negatePlayer } from "./utils";
import { EnPassantMove, Move, SpecialMoveType } from "./Moves";
import { King, Piece, PieceType, Rook } from "./pieces";
import { Player } from "./Player";
import {
    addToFile,
    arePositionsEqual,
    ChessFile,
    getFileDifference,
} from "./positions";

export class Game {
    static readonly boardSize = 8;
    private state: GameState = GameState.UNSTARTED;
    private currentPlayer: Player = Player.WHITE;
    private board: Board = createNewBoard();
    private moves: Move[] = [];

    constructor(
        private readonly checkCalculator = new CheckCalculator(),
        private readonly availableMoveCalculator: AvailableMoveCalculator = new AvailableMoveCalculator(
            checkCalculator
        )
    ) {}

    getState(): GameState {
        return this.state;
    }

    /** Returns clone of the original board */
    getBoard(): Board {
        return _.cloneDeep(this.board);
    }

    move(move: Move): void {
        if (this.isGameOver()) {
            throw new Error(
                "Game has already finished, no more moves can be made"
            );
        }

        const updatedMove = this.checkMoveValidityAndAddMetadata(move);
        if (!updatedMove) {
            throw new Error("Invalid move");
        }

        this.applyMove(updatedMove);
        this.state = this.getNewGameStateAfterMove();

        if (this.state === GameState.IN_PROGRESS) {
            this.changePlayer();
        }
    }

    getAvailableMovesForPlayer(): Move[] {
        return this.availableMoveCalculator.getAvailableMovesForPlayer(
            this.board,
            this.currentPlayer,
            this.getLastMove()
        );
    }

    getCurrentPlayer(): Player | null {
        if (this.isGameOver()) {
            return null;
        }

        return this.currentPlayer;
    }

    clone(): Game {
        const clone = new Game();
        clone.state = this.state;
        clone.currentPlayer = this.currentPlayer;
        clone.board = _.cloneDeep(this.board);
        clone.moves = _.cloneDeep(this.moves);

        return clone;
    }

    private getLastMove(): Move | null {
        return this.moves.slice(-1)[0] || null;
    }

    private changePlayer(): void {
        this.currentPlayer =
            this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE;
    }

    private isGameOver(): boolean {
        const draws = [
            GameState.DRAW_BY_50_MOVE_RULE,
            GameState.DRAW_BY_75_MOVE_RULE,
            GameState.DRAW_BY_AGREEMENT,
            GameState.DRAW_BY_INSUFFICIENT_MATERIAL,
            GameState.DRAW_BY_REPETITION,
            GameState.DRAW_BY_STALEMATE,
        ];

        return [GameState.WHITE_WON, GameState.BLACK_WON, ...draws].includes(
            this.state
        );
    }

    private checkMoveValidityAndAddMetadata(move: Move): Move | null {
        const availableMoves = this.getAvailableMovesForPlayer();
        const availableMove = availableMoves.find(
            (availableMove) =>
                arePositionsEqual(availableMove.from, move.from) &&
                arePositionsEqual(availableMove.to, move.to)
        );

        return availableMove || null;
    }

    private castleRook(kingMove: Move) {
        const rank = kingMove.from.rank;
        const isKingMoveToTheRight =
            getFileDifference(kingMove.to.file, kingMove.from.file) < 0;
        const rookFile = isKingMoveToTheRight ? ChessFile.H : ChessFile.A;

        const rook = this.board[rookFile][rank] as Rook;
        const newRookFile = addToFile(
            kingMove.to.file,
            isKingMoveToTheRight ? -1 : 1
        ) as ChessFile;

        this.board[newRookFile][rank] = rook;
        this.board[rookFile][rank] = null;
    }

    private checkForCastle(move: Move, piece: Piece) {
        const isKing = piece.type === PieceType.KING;
        const filesToMove = Math.abs(
            getFileDifference(move.from.file, move.to.file)
        );
        return isKing && filesToMove === 2;
    }

    private enPassantIfAppliable(move: Move, piece: Piece) {
        if ((move as EnPassantMove).type === SpecialMoveType.EN_PASSANT) {
            this.board[move.to.file][
                move.to.rank +
                    (this.getCurrentPlayer() === Player.WHITE ? -1 : 1)
            ] = null;
        }
    }

    private applyMove(move: Move): void {
        const piece = this.board[move.from.file][move.from.rank] as Piece;
        this.board[move.to.file][move.to.rank] = piece;
        this.board[move.from.file][move.from.rank] = null;

        if (isCastleablePiece(piece)) {
            piece.hasMoved = true;

            // TODO - use SpecialMoveType (?)
            if (this.checkForCastle(move, piece)) {
                this.castleRook(move);
            }
        }

        this.enPassantIfAppliable(move, piece);
        this.moves.push(move);
    }

    // todo - extract to separate class (?)
    // maybe extract it to a class called GameStateHandler (?)
    private getNewGameStateAfterMove(): GameState {
        if (this.state === GameState.UNSTARTED) {
            return GameState.IN_PROGRESS;
        }

        const enemy = negatePlayer(this.currentPlayer);
        const enemyMoves =
            this.availableMoveCalculator.getAvailableMovesForPlayer(
                this.board,
                enemy,
                this.getLastMove()
            );

        if (enemyMoves.length === 0) {
            const availableCurrentPlayerMoves =
                this.availableMoveCalculator.getAvailableMovesForPlayer(
                    this.board,
                    this.currentPlayer,
                    this.getLastMove()
                );

            const checkingPiecesOfCurrentPlayer =
                this.checkCalculator.getCheckingEnemyPieces(
                    enemy,
                    this.board,
                    availableCurrentPlayerMoves
                );

            if (checkingPiecesOfCurrentPlayer.length === 0) {
                return GameState.DRAW_BY_STALEMATE;
            } else {
                return this.currentPlayer === Player.WHITE
                    ? GameState.WHITE_WON
                    : GameState.BLACK_WON;
            }
        }

        return this.state;
    }
}
