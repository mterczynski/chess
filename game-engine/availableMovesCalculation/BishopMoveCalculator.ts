import { Board } from "../Board";
import { addToFile, addToRank, negatePlayer } from "../misc";
import { Move } from "../Move";
import { Bishop } from "../pieces";
import { Player } from "../Player";
import { Position } from "../positions";
import { MoveCalculator } from "./MoveCalculator";

interface Diagonal {
    fileIncrement: number,
    rankIncrement: number,
}

export class BishopMoveCalculator implements MoveCalculator {
    getAvailableMovesForPieceIgnoringKingSafety(bishop: Bishop & {position: Position}, board: Board) {
        const diagonals: Diagonal[] = [
            {fileIncrement: -1,  rankIncrement: -1},
            {fileIncrement: -1,  rankIncrement: 1},
            {fileIncrement: 1,  rankIncrement: -1},
            {fileIncrement: 1,  rankIncrement: 1},
        ];

        return diagonals.flatMap(diag => this.getAvailableMovesForDiagonal(bishop, board, diag));
    }

    private getAvailableMovesForDiagonal(bishop: Bishop & {position: Position}, board: Board, diagonal: Diagonal): Move[] {
        const availableMoves: Move[] = [];
        let nextFile = addToFile(bishop.position.file, diagonal.fileIncrement);
        let nextRank = addToRank(bishop.position.rank, diagonal.rankIncrement);
        let iteration = 1;

        while(nextFile && nextRank) {
            const nextSquare = board[nextFile][nextRank];

            if(!nextSquare) {
                availableMoves.push({
                    from: bishop.position,
                    to: {file: nextFile, rank: nextRank}
                });
            } else if(nextSquare.player === negatePlayer(bishop.player)) {
                availableMoves.push({
                    from: bishop.position,
                    to: {file: nextFile, rank: nextRank}
                });
                break;
            } else {
                break;
            }

            iteration++;
            nextFile = addToFile(bishop.position.file, diagonal.fileIncrement * iteration);
            nextRank = addToRank(bishop.position.rank, diagonal.rankIncrement * iteration);
        }

        return availableMoves;
    }
}


