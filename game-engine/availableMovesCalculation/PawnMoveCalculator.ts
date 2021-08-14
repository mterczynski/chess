import { Game } from "..";
import { addToFile } from "../addToFile";
import { addToRank } from "../addToRank";
import { Board } from "../Board";
import { Move } from "../Move";
import { Pawn, Piece, PieceType } from "../pieces";
import { Player } from "../Player";
import { ChessFile, Position, Rank } from "../positions";

export class PawnMoveCalculator {
    /** lastMove can be null only before white has made the first move */
    getAvailableMovesForPawn(pawn: Pawn & {position: Position}, board: Board, currentPlayer: Player, lastMove: Move | null): Move[] {
        const availableMoves: Move[] = [
            ...this.getForwardMoves(pawn, board, currentPlayer),
            ...this.getEnPassantMoves(pawn, board, currentPlayer, lastMove),
            ...this.getNonEnPassantAttackingMoves(pawn, board, currentPlayer),
        ];

        return availableMoves;
    }

    private getForwardMoves(pawn: Pawn & {position: Position}, board: Board, currentPlayer: Player): Move[] {
        const direction = this.getDirection(currentPlayer);
        const file = pawn.position.file;
        const nextRank: Rank = pawn.position.rank + direction as Rank;
        const nextSecondRank: Rank = pawn.position.rank + direction * 2 as Rank
        const firstSquareUp = board[file][nextRank];
        const secondSquareUp = board[file][nextSecondRank];
        const startingRank = currentPlayer === Player.WHITE ? 2 : Game.boardSize - 1;
        const hasntMoved: boolean = pawn.position.rank === startingRank;

        const forwardSingleMove: Move | null = firstSquareUp === null ? {from: pawn.position, to: {file, rank: nextRank}} : null;
        const forwardDoubleMove: Move | null = (forwardSingleMove && hasntMoved && secondSquareUp === null) ? {from: pawn.position, to: {file, rank: nextSecondRank}} : null;

        return [
            ...(forwardSingleMove ? [forwardSingleMove] : []),
            ...(forwardDoubleMove ? [forwardDoubleMove] : []),
        ];
    };

    private getNonEnPassantAttackingMoves(pawn: Pawn & {position: Position}, board: Board, currentPlayer: Player): Move[] {
        const direction = this.getDirection(currentPlayer);
        const attackingMoves: Move[] = [];

        const nextRank = addToRank(pawn.position.rank, direction);

        if(nextRank === null) {
            return [];
        }

        const checkForPossibleAttackOnFile = (file: ChessFile | null): void => {
            if(file) {
                const squareToAttack = board[file][nextRank];

                if(squareToAttack && squareToAttack.player !== currentPlayer) {
                    attackingMoves.push({
                        from: pawn.position,
                        to: {
                            file,
                            rank: nextRank
                        }
                    });
                }
            }
        }

        const fileToTheBoardsLeft = addToFile(pawn.position.file, -1);
        const fileToTheBoardsRight = addToFile(pawn.position.file, 1);

        checkForPossibleAttackOnFile(fileToTheBoardsLeft);
        checkForPossibleAttackOnFile(fileToTheBoardsRight);

        return attackingMoves;
    }

    private getEnPassantMoves(pawn: Pawn & {position: Position}, board: Board, currentPlayer: Player, lastMove: Move | null): Move[] {
        if(!lastMove) {
            return [];
        }

        const direction = this.getDirection(currentPlayer);
        const lastMovedPiece: Piece = board[lastMove.to.file][lastMove.to.rank] as Piece;
        const wasPawnMovedInLastMove = lastMovedPiece.type === PieceType.PAWN;
        const wasLastMoveBy2Ranks = (lastMove.to.rank - lastMove.from.rank) * direction === 2;
        const wasLastMoveDoublePawnMove = lastMove && wasPawnMovedInLastMove && wasLastMoveBy2Ranks;
        const isLastMovedPieceNextToPawn = pawn.position.rank === lastMove.to.rank && (addToFile(pawn.position.file, 1) === lastMove.to.file || addToFile(pawn.position.file, -1) === lastMove.to.file)

        if(!wasLastMoveDoublePawnMove && isLastMovedPieceNextToPawn) {
            return [
                {
                    from: pawn.position,
                    to: {
                        file: lastMove.to.file,
                        rank: addToRank(pawn.position.rank, direction) as Rank,
                    }
                }
            ];
        }

        return [];
    }

    private getDirection(currentPlayer: Player): 1 | -1 {
        return currentPlayer === Player.WHITE ? 1 : -1;
    }
}
