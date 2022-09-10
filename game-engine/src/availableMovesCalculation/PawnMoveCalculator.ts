import { Game } from "../Game";
import { Board } from "../Board";
import { Move, SpecialMoveType } from "../Moves";
import { Pawn, Piece, PieceType } from "../pieces";
import { Player } from "../Player";
import { addToFile, addToRank, ChessFile, Position, Rank } from "../positions";
import { MoveCalculator } from "./MoveCalculator";

export class PawnMoveCalculator implements MoveCalculator {
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
                ? { from: pawn.position, to: { file, rank: nextRank } }
                : null;
        const forwardDoubleMove: Move | null =
            forwardSingleMove && hasntMoved && secondSquareUp === null
                ? { from: pawn.position, to: { file, rank: nextSecondRank } }
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
                        type: SpecialMoveType.PROMOTION,
                        promoteTo: PieceType.KNIGHT,
                    },
                    {
                        ...forwardSingleMove,
                        type: SpecialMoveType.PROMOTION,
                        promoteTo: PieceType.BISHOP,
                    },
                    {
                        ...forwardSingleMove,
                        type: SpecialMoveType.PROMOTION,
                        promoteTo: PieceType.ROOK,
                    },
                    {
                        ...forwardSingleMove,
                        type: SpecialMoveType.PROMOTION,
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
            if (file) {
                const squareToAttack = board[file][nextRank];

                if (squareToAttack && squareToAttack.player !== pawn.player) {
                    attackingMoves.push({
                        from: pawn.position,
                        to: {
                            file,
                            rank: nextRank,
                        },
                    });
                }
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
                    type: SpecialMoveType.EN_PASSANT,
                },
            ];
        }

        return [];
    }

    private getDirection(currentPlayer: Player): 1 | -1 {
        return currentPlayer === Player.WHITE ? 1 : -1;
    }
}
