import { Board } from "../Board";
import { Move } from "../Moves";
import { Piece, PieceWithPosition } from "../pieces";
import { getPlayerKing } from "../pieces/getPlayerKing";
import { Player } from "../Player";
import { arePositionsEqual } from "../positions";


export class CheckCalculator {
    /** get pieces that create checks */
    getCheckingEnemyPieces(currentPlayer: Player, board: Board, availableEnemyMovesIgnoringKingSafety: Move[]): PieceWithPosition[] {
        const currentPlayerKing = getPlayerKing(currentPlayer, board);

        const movesCheckingCurrentPlayerKing = availableEnemyMovesIgnoringKingSafety.filter(move => arePositionsEqual(move.to, currentPlayerKing.position));
        const distinctAttackerPositions = movesCheckingCurrentPlayerKing.map(move => move.from); // a single piece can have max one check on king

        return distinctAttackerPositions.map(position => {
            const piece = board[position.file][position.rank] as Piece;

            return {
                ...piece,
                position,
            };
        })
    }
}
