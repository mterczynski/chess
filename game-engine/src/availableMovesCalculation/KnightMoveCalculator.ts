import { Board } from "../Board";
import { Move } from "../Moves";
import { Knight } from "../pieces";
import { addToFile, addToRank, Position } from "../positions";
import { PieceMoveCalculator } from "./PieceMoveCalculator";

export class KnightMoveCalculator implements PieceMoveCalculator {
    getAvailableMovesForPieceIgnoringKingSafety(
        knight: Knight & { position: Position },
        board: Board
    ): Move[] {
        const allMoves = [
            {
                from: knight.position,
                to: {
                    file: addToFile(knight.position.file, -2),
                    rank: addToRank(knight.position.rank, -1),
                },
            },
            {
                from: knight.position,
                to: {
                    file: addToFile(knight.position.file, -2),
                    rank: addToRank(knight.position.rank, 1),
                },
            },
            {
                from: knight.position,
                to: {
                    file: addToFile(knight.position.file, -1),
                    rank: addToRank(knight.position.rank, -2),
                },
            },
            {
                from: knight.position,
                to: {
                    file: addToFile(knight.position.file, -1),
                    rank: addToRank(knight.position.rank, 2),
                },
            },
            {
                from: knight.position,
                to: {
                    file: addToFile(knight.position.file, 1),
                    rank: addToRank(knight.position.rank, -2),
                },
            },
            {
                from: knight.position,
                to: {
                    file: addToFile(knight.position.file, 1),
                    rank: addToRank(knight.position.rank, 2),
                },
            },
            {
                from: knight.position,
                to: {
                    file: addToFile(knight.position.file, 2),
                    rank: addToRank(knight.position.rank, -1),
                },
            },
            {
                from: knight.position,
                to: {
                    file: addToFile(knight.position.file, 2),
                    rank: addToRank(knight.position.rank, 1),
                },
            },
        ];

        const movesWithinBoard = allMoves.filter(
            (move) => move.to.file && move.to.rank
        ) as Move[];
        const movesWithoutOwnPieces = movesWithinBoard.filter((move) => {
            const square = board[move.to.file][move.to.rank];
            const isOwnPieceOnSquare =
                square && square.player === knight.player;
            return !isOwnPieceOnSquare;
        });

        return movesWithoutOwnPieces;
    }
}
