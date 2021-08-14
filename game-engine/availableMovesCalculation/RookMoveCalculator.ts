import {Position} from "../positions";
import {Board} from "../Board";
import {Rook} from "../pieces";
import {Move} from "../Move";
import { addToFile, addToRank, negatePlayer } from "../misc";

interface Line {
    fileIncrement: number,
    rankIncrement: number,
}

export class RookMoveCalculator {
    getAvailableMovesForRook(rook: Rook & {position: Position}, board: Board): Move[] {
        const lines: Line[] = [
            {fileIncrement: -1,  rankIncrement: 0}, // left
            {fileIncrement: 1,  rankIncrement: 0}, // right
            {fileIncrement: 0,  rankIncrement: -1}, // bottom
            {fileIncrement: 0,  rankIncrement: 1}, // top
        ]

        return lines.flatMap(line => this.getAvailableMovesForLine(rook, board, line));
    }

    private getAvailableMovesForLine(rook: Rook & {position: Position}, board: Board, line: Line): Move[] {
        const availableMoves: Move[] = [];
        let nextFile = addToFile(rook.position.file, line.fileIncrement);
        let nextRank = addToRank(rook.position.rank, line.rankIncrement);
        let iteration = 1;

        while(nextFile && nextRank) {
            const nextSquare = board[nextFile][nextRank];

            if(!nextSquare) {
                availableMoves.push({
                    from: rook.position,
                    to: {file: nextFile, rank: nextRank}
                });
            } else if(nextSquare.player === negatePlayer(rook.player)) {
                availableMoves.push({
                    from: rook.position,
                    to: {file: nextFile, rank: nextRank}
                });
                break;
            } else {
                break;
            }

            iteration++;
            nextFile = addToFile(rook.position.file, line.fileIncrement * iteration);
            nextRank = addToRank(rook.position.rank, line.rankIncrement * iteration);
        }

        return availableMoves;
    }
}
