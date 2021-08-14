import { Board } from "../Board";
import { Move } from "../Move";
import { Bishop, King, Knight, PieceType, PieceWithPosition, Queen, Rook } from "../pieces";
import { Player } from "../Player";
import { Position } from "../positions";
import { KnightMoveCalculator } from "./KnightMoveCalculator";
import { PawnMoveCalculator } from "./PawnMoveCalculator";

/**
 * Class for calculating available moves
 */
export class AvailableMoveCalculator {
    constructor(
        private readonly pawnMoveCalculator: PawnMoveCalculator = new PawnMoveCalculator(),
        private readonly knightMoveCalculator: KnightMoveCalculator = new KnightMoveCalculator(),
    ) {}

    getAvailableMovesForPiece(pieceWithPostion: PieceWithPosition, board: Board, player: Player, lastMove: Move | null): Move[] {
        if(pieceWithPostion.type === PieceType.PAWN) {
            return this.pawnMoveCalculator.getAvailableMovesForPawn(pieceWithPostion, board, player, lastMove);
        } else if(pieceWithPostion.type === PieceType.KNIGHT) {
            return this.getAvailableMovesForKnight(pieceWithPostion, board);
        }

        return [];
    }

    private getAvailableMovesForKnight(knight: Knight & {position: Position}, board: Board): Move[] {
        // todo
        return [];
    }

    private getAvailableMovesForBishop(bishop: Bishop & {position: Position}, board: Board): Move[] {
        // todo
        return [];

    }

    private getAvailableMovesForRook(rook: Rook & {position: Position}, board: Board): Move[] {
        // todo
        return [];

    }

    private getAvailableMovesForQueen(queen: Queen & {position: Position}, board: Board): Move[] {
        // todo
        return [];

    }

    private getAvailableMovesForKing(king: King & Position, board: Board): Move[] {
        // todo
        // todo castling
        return [];

    }
}
