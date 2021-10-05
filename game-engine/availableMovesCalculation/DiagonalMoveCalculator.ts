import { Board } from "../Board";
import { addToFile, addToRank, negatePlayer } from "../misc";
import { Move } from "../Moves";
import { Bishop, PieceWithPosition } from "../pieces";

interface Diagonal {
    fileIncrement: number,
    rankIncrement: number,
}

export class DiagonalMoveCalculator {
    getAvailableMovesOnLineIgnoringKingSafety(piece: PieceWithPosition, board: Board): Move[] {
        const diagonals: Diagonal[] = [
            { fileIncrement: -1, rankIncrement: -1 },
            { fileIncrement: -1, rankIncrement: 1 },
            { fileIncrement: 1, rankIncrement: -1 },
            { fileIncrement: 1, rankIncrement: 1 },
        ];

        return diagonals.flatMap(diag => this.getAvailableMovesForDiagonal(piece, board, diag));
    }

    private getAvailableMovesForDiagonal(piece: PieceWithPosition, board: Board, diagonal: Diagonal): Move[] {
        const availableMoves: Move[] = [];
        let nextFile = addToFile(piece.position.file, diagonal.fileIncrement);
        let nextRank = addToRank(piece.position.rank, diagonal.rankIncrement);
        let iteration = 1;

        while (nextFile && nextRank) {
            const nextSquare = board[nextFile][nextRank];

            if (!nextSquare) {
                availableMoves.push({
                    from: piece.position,
                    to: { file: nextFile, rank: nextRank }
                });
            } else if (nextSquare.player === negatePlayer(piece.player)) {
                availableMoves.push({
                    from: piece.position,
                    to: { file: nextFile, rank: nextRank }
                });
                break;
            } else {
                break;
            }

            iteration++;
            nextFile = addToFile(piece.position.file, diagonal.fileIncrement * iteration);
            nextRank = addToRank(piece.position.rank, diagonal.rankIncrement * iteration);
        }

        return availableMoves;
    }
}
