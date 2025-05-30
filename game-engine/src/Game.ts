import * as _ from "lodash";
import {
    AvailableMoveCalculator,
    CheckCalculator,
} from "./availableMovesCalculation";
import { Board } from "./Board";
import { GameState } from "./GameState";
import { EnPassantMove, Move, PromotionMove, SpecialMoveType } from "./Moves";
import { Piece, PieceType, Rook } from "./pieces";
import { Player } from "./Player";
import {
    addToFile,
    arePositionsEqual,
    ChessFile,
    getFileDifference,
} from "./positions";
import {
    createNewBoard,
    isCastleablePiece,
    isCastleablePieceType,
    isDraw,
} from "./utils";
import { serializeBoardState } from "./utils/serializeBoardState";
import { GameStateHandler } from "./GameStateHandler";

export class Game {
    static readonly boardSize = 8;
    private state: GameState = GameState.UNSTARTED;
    private currentPlayer: Player = Player.WHITE;
    private board: Board = createNewBoard();
    private moves: Move[] = [];
    // Map: serialized position -> count
    private positionCounts: Record<string, number> = {};

    constructor(
        private readonly checkCalculator = new CheckCalculator(),
        private readonly availableMoveCalculator: AvailableMoveCalculator = new AvailableMoveCalculator(
            checkCalculator,
        ),
        private readonly gameStateHandler = new GameStateHandler(
            availableMoveCalculator,
            checkCalculator,
        ),
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
                "Game has already finished, no more moves can be made",
            );
        }

        const updatedMove = this.checkMoveValidityAndAddMetadata(move);
        if (!updatedMove) {
            throw new Error("Invalid move");
        }

        this.applyMove(updatedMove);
        this.updatePositionCounts();
        this.state = this.getNewGameStateAfterMove();

        if (this.state === GameState.IN_PROGRESS) {
            this.changePlayer();
        }
    }

    getAvailableMovesForPlayer(): Move[] {
        return this.availableMoveCalculator.getAvailableMovesForPlayer(
            this.board,
            this.currentPlayer,
            this.getLastMove(),
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

    getMoveHistory(): Move[] {
        return _.cloneDeep(this.moves);
    }

    private getLastMove(): Move | null {
        return this.moves.slice(-1)[0] || null;
    }

    private changePlayer(): void {
        this.currentPlayer =
            this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE;
    }

    private isGameOver(): boolean {
        return (
            [GameState.WHITE_WON, GameState.BLACK_WON].includes(this.state) ||
            isDraw(this.state)
        );
    }

    private checkMoveValidityAndAddMetadata(move: Move): Move | null {
        const availableMoves = this.getAvailableMovesForPlayer();
        const availableMove = availableMoves.find(
            (availableMove) =>
                arePositionsEqual(availableMove.from, move.from) &&
                arePositionsEqual(availableMove.to, move.to),
        );

        if ((availableMove as any)?.type === SpecialMoveType.PROMOTION) {
            if ((move as any).type !== SpecialMoveType.PROMOTION) {
                throw new Error(
                    `Invalid move type (expected=${SpecialMoveType.PROMOTION})`,
                );
            }

            if (!(move as PromotionMove).promoteTo) {
                throw new Error(`Invalid move: (missing 'promoteTo')`);
            }

            return move;
        }

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
            isKingMoveToTheRight ? -1 : 1,
        ) as ChessFile;

        this.board[newRookFile][rank] = rook;
        this.board[rookFile][rank] = null;
    }

    private checkForCastle(move: Move, piece: Piece) {
        const isKing = piece.type === PieceType.KING;
        const filesToMove = Math.abs(
            getFileDifference(move.from.file, move.to.file),
        );
        return isKing && filesToMove === 2;
    }

    private enPassantIfAppliable(move: Move) {
        if ((move as EnPassantMove).type === SpecialMoveType.EN_PASSANT) {
            this.board[move.to.file][
                move.to.rank +
                    (this.getCurrentPlayer() === Player.WHITE ? -1 : 1)
            ] = null;
        }
    }

    private promote(move: PromotionMove) {
        this.board[move.to.file][move.to.rank] = isCastleablePieceType(
            move.promoteTo,
        )
            ? {
                  player: this.currentPlayer,
                  type: move.promoteTo,
                  hasMoved: true,
              }
            : {
                  player: this.currentPlayer,
                  type: move.promoteTo,
              };
    }

    private applyMove(move: Move): void {
        const piece = this.board[move.from.file][move.from.rank] as Piece;
        this.board[move.to.file][move.to.rank] = piece;
        this.board[move.from.file][move.from.rank] = null;
        if (isCastleablePiece(piece)) {
            piece.hasMoved = true;
            if (this.checkForCastle(move, piece)) {
                this.castleRook(move);
            }
        }
        this.enPassantIfAppliable(move);
        if ((move as any).type === SpecialMoveType.PROMOTION) {
            this.promote(move as PromotionMove);
        }
        this.moves.push(move);
    }

    private getNewGameStateAfterMove(): GameState {
        return this.gameStateHandler.getNewGameStateAfterMove(
            this.board,
            this.currentPlayer,
            this.positionCounts,
            this.state,
            this.getLastMove(),
        );
    }

    private updatePositionCounts() {
        const key = serializeBoardState(this.board, this.currentPlayer);
        this.positionCounts[key] = (this.positionCounts[key] || 0) + 1;
    }
}
