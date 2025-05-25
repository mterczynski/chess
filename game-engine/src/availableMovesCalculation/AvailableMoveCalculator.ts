import * as _ from "lodash";
import { Board } from "../Board";
import { addToFile, negatePlayer } from "../utils";
import { getFileDifference } from "../positions/getFileDifference";
import { isCastlingMove } from "../utils/isCastlingMove";
import { CastlingMove, Move } from "../Moves";
import {
    getPlayerPieces,
    King,
    Piece,
    PieceType,
    PieceWithPosition,
} from "../pieces";
import { Player } from "../Player";
import { ChessFile } from "../positions";
import { BishopMoveCalculator } from "./BishopMoveCalculator";
import { CheckCalculator } from "./CheckCalculator";
import { KingMoveCalculator } from "./KingMoveCalculator";
import { KnightMoveCalculator } from "./KnightMoveCalculator";
import { PawnMoveCalculator } from "./PawnMoveCalculator";
import { QueenMoveCalculator } from "./QueenMoveCalculator";
import { RookMoveCalculator } from "./RookMoveCalculator";

/**
 * Class for calculating available moves of a player
 */
export class AvailableMoveCalculator {
    constructor(
        private readonly checkCalculator: CheckCalculator = new CheckCalculator(),
        private readonly pawnMoveCalculator: PawnMoveCalculator = new PawnMoveCalculator(),
        private readonly knightMoveCalculator: KnightMoveCalculator = new KnightMoveCalculator(),
        private readonly bishopMoveCalculator: BishopMoveCalculator = new BishopMoveCalculator(),
        private readonly rookMoveCalculator: RookMoveCalculator = new RookMoveCalculator(),
        private readonly queenMoveCalculator: QueenMoveCalculator = new QueenMoveCalculator(),
        private readonly kingMoveCalculator: KingMoveCalculator = new KingMoveCalculator(),
    ) {}

    getAvailableMovesForPlayer(
        board: Board,
        player: Player,
        lastMove: Move | null,
    ): Move[] {
        const currentPlayerPieces = getPlayerPieces(board, player);

        return currentPlayerPieces.flatMap((piece) =>
            this.getAvailableMovesForPiece(piece, board, lastMove),
        );
    }

    private getAvailableMovesForPiece(
        pieceWithPostion: PieceWithPosition,
        board: Board,
        lastMove: Move | null,
    ): Move[] {
        const availableMovesIgnoringKingSafety =
            this.getAvailableMovesForPieceIgnoringKingSafety(
                pieceWithPostion,
                board,
                lastMove,
            );
        const currentPlayer = pieceWithPostion.player;

        return availableMovesIgnoringKingSafety.filter((move) => {
            // const boardClone = _.cloneDeep(board);
            const piece = board[move.from.file][move.from.rank] as Piece;

            if (isCastlingMove(move)) {
                return this.isCastlingMoveSafeForKing(
                    move,
                    board,
                    piece as King,
                );
            } else {
                return this.isMoveLegal(move, board, currentPlayer);
            }
        });
    }

    private isCastlingMoveSafeForKing(
        move: CastlingMove,
        board: Board,
        king: King,
    ): boolean {
        const currentPlayer = king.player;
        const availableEnemyMoves =
            this.getAvailableMovesForPlayerIgnoringKingSafety(
                board,
                negatePlayer(currentPlayer),
                null,
            );
        const checkingPiecesOfEnemy =
            this.checkCalculator.getCheckingEnemyPieces(
                currentPlayer,
                board,
                availableEnemyMoves,
            );
        const isKingInCheck = checkingPiecesOfEnemy.length > 0;

        if (isKingInCheck) {
            return false;
        }

        const moveVector = getFileDifference(move.from.file, move.to.file);
        const moveVectorDividedBy2 = moveVector / 2;
        /** Move of the king by one file in the direction of castleable rook, used to check if king can move by one field towards the rook,
         * if it can't, the king can't castle */
        const intermediateMove: Move = {
            ...move,
            to: {
                file: addToFile(
                    move.from.file,
                    moveVectorDividedBy2,
                ) as ChessFile,
                rank: move.to.rank,
            },
        };

        return (
            !isKingInCheck &&
            this.isMoveLegal(intermediateMove, board, currentPlayer) &&
            this.isMoveLegal(move, board, currentPlayer)
        );
    }

    private getAvailableMovesForPieceIgnoringKingSafety(
        pieceWithPostion: PieceWithPosition,
        board: Board,
        lastMove: Move | null,
    ): Move[] {
        if (pieceWithPostion.type === PieceType.PAWN) {
            return this.pawnMoveCalculator.getAvailableMovesForPieceIgnoringKingSafety(
                pieceWithPostion,
                board,
                lastMove,
            );
        } else if (pieceWithPostion.type === PieceType.KNIGHT) {
            return this.knightMoveCalculator.getAvailableMovesForPieceIgnoringKingSafety(
                pieceWithPostion,
                board,
            );
        } else if (pieceWithPostion.type === PieceType.BISHOP) {
            return this.bishopMoveCalculator.getAvailableMovesForPieceIgnoringKingSafety(
                pieceWithPostion,
                board,
            );
        } else if (pieceWithPostion.type === PieceType.ROOK) {
            return this.rookMoveCalculator.getAvailableMovesForPieceIgnoringKingSafety(
                pieceWithPostion,
                board,
            );
        } else if (pieceWithPostion.type === PieceType.QUEEN) {
            return this.queenMoveCalculator.getAvailableMovesForPieceIgnoringKingSafety(
                pieceWithPostion,
                board,
            );
        } else if (pieceWithPostion.type === PieceType.KING) {
            return this.kingMoveCalculator.getAvailableMovesForPieceIgnoringKingSafety(
                pieceWithPostion,
                board,
            );
        }

        throw new Error("Unknown piece type");
    }

    private getAvailableMovesForPlayerIgnoringKingSafety(
        board: Board,
        player: Player,
        lastMove: Move | null,
    ): Move[] {
        const currentPlayerPieces = getPlayerPieces(board, player);

        return currentPlayerPieces.flatMap((piece) =>
            this.getAvailableMovesForPieceIgnoringKingSafety(
                piece,
                board,
                lastMove,
            ),
        );
    }

    /** This function only checks if the `move` wouldn't cause the current player's king to be in check */
    private isMoveLegal(
        move: Move,
        board: Board,
        currentPlayer: Player,
    ): boolean {
        const boardClone = _.cloneDeep(board);
        const piece = boardClone[move.from.file][move.from.rank] as Piece;

        boardClone[move.to.file][move.to.rank] = piece;
        boardClone[move.from.file][move.from.rank] = null;

        /** List of moves that enemy can perform (ignoring king safety), the list of moves might include moves that would cause enemy king to be in check.
         * This list of moves is used to check what enemy pieces would check current player's king after making the `move`
         */
        const availableEnemyMovesAfterMove =
            this.getAvailableMovesForPlayerIgnoringKingSafety(
                boardClone,
                negatePlayer(currentPlayer),
                null,
            );
        const checkingPiecesOfEnemyAfterMove =
            this.checkCalculator.getCheckingEnemyPieces(
                currentPlayer,
                boardClone,
                availableEnemyMovesAfterMove,
            );

        return checkingPiecesOfEnemyAfterMove.length === 0;
    }
}
