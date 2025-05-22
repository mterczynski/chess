import { Board } from "../Board";
import { Move, MoveType } from "../Moves";
import { Knight } from "../pieces";
import { addToFile, addToRank, Position } from "../positions";
import { PieceMoveCalculator } from "./PieceMoveCalculator";
import { negatePlayer } from "../utils";

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
        );

        return movesWithinBoard.map((move) => {
            // Both file and rank are guaranteed non-null here
            const file = move.to.file!;
            const rank = move.to.rank!;
            const square = board[file][rank];
            return {
                ...move,
                to: { file, rank },
                isAttacking:
                    !!square && square.player === negatePlayer(knight.player),
                type: MoveType.STANDARD,
            };
        });
    }
}
