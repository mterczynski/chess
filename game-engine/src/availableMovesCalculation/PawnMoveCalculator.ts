import { Game } from "../Game";
import { Board } from "../Board";
import { Move, MoveType } from "../Moves";
import { Pawn, Piece, PieceType } from "../pieces";
import { Player } from "../Player";
import { addToFile, addToRank, ChessFile, Position, Rank } from "../positions";
import { PieceMoveCalculator } from "./PieceMoveCalculator";

export class PawnMoveCalculator implements PieceMoveCalculator {
    /** lastMove can be null only before white has made the first move */
    getAvailableMovesForPieceIgnoringKingSafety(
        pawn: Pawn & { position: Position },
        board: Board,
        lastMove: Move | null
    ): Move[] {
        const availableMoves: Move[] = [
            ...this.getForwardMoves(pawn, board),
            ...this.getEnPassantMoves(pawn, board, lastMove),
            ...this.getNonEnPassantAttackingMoves(pawn, board),
        ];

        return availableMoves;
    }

    private getForwardMoves(
        pawn: Pawn & { position: Position },
        board: Board
    ): Move[] {
        const direction = this.getDirection(pawn.player);
        const file = pawn.position.file;
        const nextRank: Rank = (pawn.position.rank + direction) as Rank;
        const nextSecondRank: Rank = (pawn.position.rank +
            direction * 2) as Rank;
        const firstSquareUp = board[file][nextRank];
        const secondSquareUp = board[file][nextSecondRank];
        const startingRank =
            pawn.player === Player.WHITE ? 2 : Game.boardSize - 1;
        const hasntMoved: boolean = pawn.position.rank === startingRank;

        let forwardSingleMove: Move | null =
            firstSquareUp === null
                ? {
                      from: pawn.position,
                      to: { file, rank: nextRank },
                      isAttacking: false,
                      type: MoveType.STANDARD,
                  }
                : null;
        const forwardDoubleMove: Move | null =
            forwardSingleMove && hasntMoved && secondSquareUp === null
                ? {
                      from: pawn.position,
                      to: { file, rank: nextSecondRank },
                      type: MoveType.STANDARD,
                      isAttacking: false,
                  }
                : null;
        const forwardMoves: Move[] = [
            ...(forwardDoubleMove ? [forwardDoubleMove] : []),
        ];

        const isPromotionAvailable =
            forwardSingleMove?.to.rank === 1 ||
            forwardSingleMove?.to.rank === Game.boardSize;

        if (forwardSingleMove) {
            if (isPromotionAvailable) {
                forwardMoves.push(
                    {
                        ...forwardSingleMove,
                        type: MoveType.PROMOTION,
                        promoteTo: PieceType.KNIGHT,
                    },
                    {
                        ...forwardSingleMove,
                        type: MoveType.PROMOTION,
                        promoteTo: PieceType.BISHOP,
                    },
                    {
                        ...forwardSingleMove,
                        type: MoveType.PROMOTION,
                        promoteTo: PieceType.ROOK,
                    },
                    {
                        ...forwardSingleMove,
                        type: MoveType.PROMOTION,
                        promoteTo: PieceType.QUEEN,
                    }
                );
            } else {
                forwardMoves.push(forwardSingleMove);
            }
        }

        return forwardMoves;
    }

    private getNonEnPassantAttackingMoves(
        pawn: Pawn & { position: Position },
        board: Board
    ): Move[] {
        const direction = this.getDirection(pawn.player);
        const attackingMoves: Move[] = [];

        const nextRank = addToRank(pawn.position.rank, direction);

        if (nextRank === null) {
            return [];
        }

        const checkForPossibleAttackOnFile = (file: ChessFile | null): void => {
            if (!file) {
                return;
            }

            const squareToAttack = board[file][nextRank];

            if (
                !squareToAttack ||
                squareToAttack?.player === null ||
                squareToAttack?.player === pawn.player
            ) {
                return;
            }

            const promotingRank =
                pawn.player === Player.WHITE ? Game.boardSize : 1;
            const isPromotionAvailable = nextRank === promotingRank;

            if (isPromotionAvailable) {
                const promotingMoveBase = {
                    from: pawn.position,
                    to: {
                        file,
                        rank: nextRank,
                    },
                    type: MoveType.PROMOTION,
                };
                attackingMoves.push({
                    ...promotingMoveBase,
                    promoteTo: PieceType.KNIGHT,
                    isAttacking: true,
                    type: MoveType.PROMOTION,
                });
                attackingMoves.push({
                    ...promotingMoveBase,
                    promoteTo: PieceType.BISHOP,
                    isAttacking: true,
                    type: MoveType.PROMOTION,
                });
                attackingMoves.push({
                    ...promotingMoveBase,
                    promoteTo: PieceType.ROOK,
                    isAttacking: true,
                    type: MoveType.PROMOTION,
                });
                attackingMoves.push({
                    ...promotingMoveBase,
                    promoteTo: PieceType.QUEEN,
                    isAttacking: true,
                    type: MoveType.PROMOTION,
                });
            } else {
                attackingMoves.push({
                    from: pawn.position,
                    to: {
                        file,
                        rank: nextRank,
                    },
                    isAttacking: true,
                    type: MoveType.STANDARD,
                });
            }
        };

        const fileToTheBoardsLeft = addToFile(pawn.position.file, -1);
        const fileToTheBoardsRight = addToFile(pawn.position.file, 1);

        checkForPossibleAttackOnFile(fileToTheBoardsLeft);
        checkForPossibleAttackOnFile(fileToTheBoardsRight);

        return attackingMoves;
    }

    private getEnPassantMoves(
        pawn: Pawn & { position: Position },
        board: Board,
        lastMove: Move | null
    ): Move[] {
        if (!lastMove) {
            return [];
        }

        const direction = this.getDirection(pawn.player);
        const lastMovedPiece: Piece = board[lastMove.to.file][
            lastMove.to.rank
        ] as Piece;
        const wasPawnMovedInLastMove = lastMovedPiece.type === PieceType.PAWN;
        const wasLastMoveBy2Ranks =
            Math.abs(lastMove.to.rank - lastMove.from.rank) === 2;
        const wasLastMoveDoublePawnMove =
            lastMove && wasPawnMovedInLastMove && wasLastMoveBy2Ranks;
        const isLastMovedPieceNextToPawn =
            pawn.position.rank === lastMove.to.rank &&
            (addToFile(pawn.position.file, 1) === lastMove.to.file ||
                addToFile(pawn.position.file, -1) === lastMove.to.file);

        if (wasLastMoveDoublePawnMove && isLastMovedPieceNextToPawn) {
            return [
                {
                    from: pawn.position,
                    to: {
                        file: lastMove.to.file,
                        rank: addToRank(pawn.position.rank, direction) as Rank,
                    },
                    type: MoveType.EN_PASSANT,
                    isAttacking: true,
                },
            ];
        }

        return [];
    }

    private getDirection(currentPlayer: Player): 1 | -1 {
        return currentPlayer === Player.WHITE ? 1 : -1;
    }
}
