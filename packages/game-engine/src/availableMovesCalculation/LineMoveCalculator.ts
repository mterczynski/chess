import { Board } from "../Board";
import { Move } from "../Moves";
import { PieceWithPosition } from "../pieces";
import { addToFile, addToRank } from "../positions";
import { negatePlayer } from "../utils";

interface Line {
    fileIncrement: number,
    rankIncrement: number,
}

export class LineMoveCalculator {
    getAvailableMovesOnLineIgnoringKingSafety(piece: PieceWithPosition, board: Board): Move[] {
        const lines: Line[] = [
            { fileIncrement: -1, rankIncrement: 0 }, // left
            { fileIncrement: 1, rankIncrement: 0 }, // right
            { fileIncrement: 0, rankIncrement: -1 }, // bottom
            { fileIncrement: 0, rankIncrement: 1 }, // top
        ]

        return lines.flatMap(line => this.getAvailableMovesForLine(piece, board, line));
    }

    private getAvailableMovesForLine(piece: PieceWithPosition, board: Board, line: Line): Move[] {
        const availableMoves: Move[] = [];
        let nextFile = addToFile(piece.position.file, line.fileIncrement);
        let nextRank = addToRank(piece.position.rank, line.rankIncrement);
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
            nextFile = addToFile(piece.position.file, line.fileIncrement * iteration);
            nextRank = addToRank(piece.position.rank, line.rankIncrement * iteration);
        }

        return availableMoves;
    }
}
