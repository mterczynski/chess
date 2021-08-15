import _ from "lodash";
import { Board } from "../Board";
import { Move } from "../Move";
import { getPlayerPieces, Piece, PieceType, PieceWithPosition } from "../pieces";
import { Player } from "../Player";
import { BishopMoveCalculator } from "./BishopMoveCalculator";
import { CheckCalculator } from "./CheckCalculator";
import { KingMoveCalculator } from "./KingMoveCalculator";
import { KnightMoveCalculator } from "./KnightMoveCalculator";
import { MoveCalculator } from "./MoveCalculator";
import { PawnMoveCalculator } from "./PawnMoveCalculator";
import { QueenMoveCalculator } from "./QueenMoveCalculator";
import { RookMoveCalculator } from "./RookMoveCalculator";

/**
 * Class for calculating available moves
 */
export class AvailableMoveCalculator implements MoveCalculator {
    constructor(
        private readonly checkCalculator: CheckCalculator = new CheckCalculator(),
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
        const availableMovesIgnoringKingSafety = this.getAvailableMovesForPieceIgnoringKingSafety(pieceWithPostion, board, lastMove);

        return availableMovesIgnoringKingSafety.filter(move => {
            const boardClone = _.cloneDeep(board);

            const piece = boardClone[move.from.file][move.from.rank] as Piece;
            const playerOfPiece = piece.player;
            boardClone[move.to.file][move.to.rank] = piece;
            boardClone[move.from.file][move.from.rank] = null;

            const checkingPiecesAfterMove = this.checkCalculator.getCheckingPieces(boardClone);
            const checkingPiecesOfEnemyAfterMove = checkingPiecesAfterMove.filter(check => check.player !== piece.player);

            return checkingPiecesOfEnemyAfterMove.length === 0;
        });
    }

    getAvailableMovesForPieceIgnoringKingSafety(pieceWithPostion: PieceWithPosition, board: Board, lastMove: Move | null): Move[] {
        const player = pieceWithPostion.player;
        if(pieceWithPostion.type === PieceType.PAWN) {
            return this.pawnMoveCalculator.getAvailableMovesForPieceIgnoringKingSafety(pieceWithPostion, board, lastMove);
        } else if(pieceWithPostion.type === PieceType.KNIGHT) {
            return this.knightMoveCalculator.getAvailableMovesForPieceIgnoringKingSafety(pieceWithPostion, board);
        } else if(pieceWithPostion.type === PieceType.BISHOP) {
            return this.bishopMoveCalculator.getAvailableMovesForPieceIgnoringKingSafety(pieceWithPostion, board);
        } else if(pieceWithPostion.type === PieceType.ROOK) {
            return this.rookMoveCalculator.getAvailableMovesForPieceIgnoringKingSafety(pieceWithPostion, board);
        } else if(pieceWithPostion.type === PieceType.QUEEN) {
            return this.queenMoveCalculator.getAvailableMovesForPieceIgnoringKingSafety(pieceWithPostion, board);
        } else if(pieceWithPostion.type === PieceType.KING) {
            return this.kingMoveCalculator.getAvailableMovesForPieceIgnoringKingSafety(pieceWithPostion, board);
        }

        return [];
    }
}
