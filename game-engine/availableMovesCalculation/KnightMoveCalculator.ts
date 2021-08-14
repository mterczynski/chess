import { moveEmitHelpers } from "typescript";
import { addToFile } from "../addToFile";
import { addToRank } from "../addToRank";
import { Board } from "../Board";
import { Move } from "../Move";
import { Knight } from "../pieces";
import { Player } from "../Player";
import { Position } from "../positions";

export class KnightMoveCalculator {
    getAvailableMovesForKnight(knight: Knight & {position: Position}, board: Board, currentPlayer: Player): Move[] {
        const allMoves = [
            {from: knight.position, to: {file: addToFile(knight.position.file, -2), rank: addToRank(knight.position.rank, -1)}},
            {from: knight.position, to: {file: addToFile(knight.position.file, -2), rank: addToRank(knight.position.rank, 1)}},
            {from: knight.position, to: {file: addToFile(knight.position.file, -1), rank: addToRank(knight.position.rank, -2)}},
            {from: knight.position, to: {file: addToFile(knight.position.file, -1), rank: addToRank(knight.position.rank, 2)}},
            {from: knight.position, to: {file: addToFile(knight.position.file, 1), rank: addToRank(knight.position.rank, -2)}},
            {from: knight.position, to: {file: addToFile(knight.position.file, 1), rank: addToRank(knight.position.rank, 2)}},
            {from: knight.position, to: {file: addToFile(knight.position.file, 2), rank: addToRank(knight.position.rank, -1)}},
            {from: knight.position, to: {file: addToFile(knight.position.file, 2), rank: addToRank(knight.position.rank, 1)}},
        ];

        const movesWithinBoard = allMoves.filter(move => move.to.file && move.to.rank) as Move[];
        const movesWithoutOwnPieces = movesWithinBoard.filter(move => {
            const square = board[move.to.file][move.to.rank];
            const isOwnPieceOnSquare = square && square.player === currentPlayer;
            return !isOwnPieceOnSquare;
        });

        return movesWithoutOwnPieces;
    }
}