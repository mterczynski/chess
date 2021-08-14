import _ from "lodash";
import { AvailableMoveCalculator } from "./availableMovesCalculation";
import { Board } from "./Board";
import { isCastleablePiece } from "./castling";
import { GameState } from "./GameState";
import { Move } from "./Move";
import { Piece, PieceType, PieceWithPosition } from "./pieces";
import { PieceFactory } from "./pieces/PieceFactory";
import { Player } from "./Player";
import { ChessFile } from "./positions";

export class Game {
    static readonly boardSize = 8;
    private state: GameState = GameState.UNSTARTED;
    private currentPlayer: Player = Player.WHITE;
    private board: Board = this.createBoard();
    private lastMove: Move | null = null;

    constructor(
        private readonly pieceFactory: PieceFactory = new PieceFactory(),
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
        const currentPlayerPieces = this.getCurrentPlayerPieces();

        return currentPlayerPieces.flatMap(piece => this.availableMoveCalculator.getAvailableMovesForPiece(piece, this.board, this.currentPlayer, this.lastMove));
    }

    getCurrentPlayer(): Player | null {
        if(this.isGameOver()) {
            return null;
        }

        return this.currentPlayer;
    }

    private getCurrentPlayerPieces(): PieceWithPosition[] {
        const pieces = Object.entries(this.board).flatMap(([fileName, fileContent]) => {
            return fileContent.map((piece, rank) => (piece === null ? null : {
                ...piece,
                position: {
                    file: fileName as ChessFile,
                    rank,
                }
            })).filter((square): square is PieceWithPosition => !!square)
        });

        return pieces.filter(piece => piece!.player === this.currentPlayer);
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

    private createBoard(): Board {
        const createSymetricalFile = (pieceType: PieceType): (Piece | null)[] => {
            return [
                null,
                this.pieceFactory.createPiece(pieceType, Player.WHITE),
                this.pieceFactory.createPiece(PieceType.PAWN, Player.WHITE),
                null,
                null,
                null,
                null,
                this.pieceFactory.createPiece(PieceType.PAWN, Player.BLACK),
                this.pieceFactory.createPiece(pieceType, Player.BLACK)
            ]
        }

        return {
            [ChessFile.A]: createSymetricalFile(PieceType.ROOK),
            [ChessFile.B]: createSymetricalFile(PieceType.KNIGHT),
            [ChessFile.C]: createSymetricalFile(PieceType.BISHOP),
            [ChessFile.D]: createSymetricalFile(PieceType.QUEEN),
            [ChessFile.E]: createSymetricalFile(PieceType.KING),
            [ChessFile.F]: createSymetricalFile(PieceType.BISHOP),
            [ChessFile.G]: createSymetricalFile(PieceType.KNIGHT),
            [ChessFile.H]: createSymetricalFile(PieceType.ROOK),
        }
    }
}
