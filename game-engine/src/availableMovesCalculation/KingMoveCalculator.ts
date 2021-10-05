import { Board } from "../Board";
import { negatePlayer, getFileRange } from "../utils";
import { Move, SpecialMoveType } from "../Moves";
import { getPlayerPieces, King, PieceType } from "../pieces";
import { ChessFile, Position, addToFile, addToRank, } from "../positions";

interface RelativeMove {
    fileIncrement: number,
    rankIncrement: number,
}

export class KingMoveCalculator {
    getAvailableMovesForPieceIgnoringKingSafety(king: King & { position: Position }, board: Board): Move[] {
        return [
            ...this.calculateNonCastlingMoves(king, board),
            ...this.calculateCastlingMoves(king, board),
        ];
    }

    private calculateNonCastlingMoves(king: King & { position: Position }, board: Board): Move[] {
        const relativeMoves: RelativeMove[] = [
            { fileIncrement: -1, rankIncrement: -1 },
            { fileIncrement: -1, rankIncrement: 0 },
            { fileIncrement: -1, rankIncrement: 1 },
            { fileIncrement: 0, rankIncrement: -1 },
            { fileIncrement: 0, rankIncrement: 1 },
            { fileIncrement: 1, rankIncrement: -1 },
            { fileIncrement: 1, rankIncrement: 0 },
            { fileIncrement: 1, rankIncrement: 1 },
        ];

        const relativeMovesInsideTheBoard = relativeMoves
            .map(relativeMove => {
                const newRank = addToRank(king.position.rank, relativeMove.rankIncrement);
                const newFile = addToFile(king.position.file, relativeMove.fileIncrement);

                return { newRank, newFile }
            })
            .filter(({ newRank, newFile }) => newFile && newRank);

        const possibleMoves = relativeMovesInsideTheBoard.filter(move => {
            const square = board[move.newFile!][move.newRank!];

            return square === null || square.player === negatePlayer(king.player);
        });

        return possibleMoves.map(possibleMove => {
            return {
                from: king.position,
                to: {
                    file: possibleMove.newFile!,
                    rank: possibleMove.newRank!,
                }
            }
        });
    }

    private calculateCastlingMoves(king: King & { position: Position }, board: Board): Move[] {
        if (king.hasMoved) {
            return [];
        }

        const movableRooks = getPlayerPieces(board, king.player).filter(piece => piece.type === PieceType.ROOK && !piece.hasMoved);
        const movableRooksWithNoPieceBetweenKing = movableRooks.filter(rook => {
            const rookFile = rook.position.file;
            const kingFile = king.position.file;

            const filesBetweenKingAndRook = getFileRange(rookFile, kingFile, { inclusive: false });
            const isEverySquareInBetweenEmpty: boolean = filesBetweenKingAndRook.every(file => board[file][king.position.rank] === null)

            return isEverySquareInBetweenEmpty;
        });

        return movableRooksWithNoPieceBetweenKing.map(rook => ({
            from: king.position,
            to: {
                rank: king.position.rank,
                file: addToFile(king.position.file, rook.position.file > king.position.file ? 2 : -2) as ChessFile
            },
            type: SpecialMoveType.CASTLING,
        }))
    }
}
