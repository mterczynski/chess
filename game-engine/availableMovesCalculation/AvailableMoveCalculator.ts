import { Board } from "../Board";
import { Move } from "../Move";
import { getPlayerPieces, PieceType, PieceWithPosition } from "../pieces";
import { Player } from "../Player";
import { BishopMoveCalculator } from "./BishopMoveCalculator";
import { KingMoveCalculator } from "./KingMoveCalculator";
import { KnightMoveCalculator } from "./KnightMoveCalculator";
import { PawnMoveCalculator } from "./PawnMoveCalculator";
import { QueenMoveCalculator } from "./QueenMoveCalculator";
import { RookMoveCalculator } from "./RookMoveCalculator";

/**
 * Class for calculating available moves
 */
export class AvailableMoveCalculator {
    constructor(
        private readonly pawnMoveCalculator: PawnMoveCalculator = new PawnMoveCalculator(),
        private readonly knightMoveCalculator: KnightMoveCalculator = new KnightMoveCalculator(),
        private readonly bishopMoveCalculator: BishopMoveCalculator = new BishopMoveCalculator(),
        private readonly rookMoveCalculator: RookMoveCalculator = new RookMoveCalculator(),
        private readonly queenMoveCalculator: QueenMoveCalculator = new QueenMoveCalculator(),
        private readonly kingMoveCalculator: KingMoveCalculator = new KingMoveCalculator(),
    ) {}

    getAvailableMovesForPlayer(board: Board, player: Player, lastMove: Move | null): Move[] {
        const currentPlayerPieces = getPlayerPieces(board, player);

        return currentPlayerPieces.flatMap(piece => this.getAvailableMovesForPiece(piece, board, lastMove));
    }

    getAvailableMovesForPiece(pieceWithPostion: PieceWithPosition, board: Board, lastMove: Move | null): Move[] {
        const player = pieceWithPostion.player;
        if(pieceWithPostion.type === PieceType.PAWN) {
            return this.pawnMoveCalculator.getAvailableMovesForPawn(pieceWithPostion, board, lastMove);
        } else if(pieceWithPostion.type === PieceType.KNIGHT) {
            return this.knightMoveCalculator.getAvailableMovesForKnight(pieceWithPostion, board);
        } else if(pieceWithPostion.type === PieceType.BISHOP) {
            return this.bishopMoveCalculator.getAvailableMovesForBishop(pieceWithPostion, board);
        } else if(pieceWithPostion.type === PieceType.ROOK) {
            return this.rookMoveCalculator.getAvailableMovesForRook(pieceWithPostion, board);
        } else if(pieceWithPostion.type === PieceType.QUEEN) {
            return this.queenMoveCalculator.getAvailableMovesForQueen(pieceWithPostion, board);
        } else if(pieceWithPostion.type === PieceType.KING) {
            return this.kingMoveCalculator.getAvailableMovesForKing(pieceWithPostion, board);
        }

        return [];
    }
}
