import { Board } from "../Board";
import { arePositionsEqual } from "../misc/arePositionsEqual";
import { Move } from "../Moves";
import { Piece, PieceWithPosition } from "../pieces";
import { getPlayerKing } from "../pieces/getPlayerKing";
import { Player } from "../Player";
import { Position } from "../positions";


export class CheckCalculator {
    /** get pieces that create checks */
    getCheckingEnemyPieces(currentPlayer: Player, board: Board, availableEnemyMovesIgnoringKingSafety: Move[]): PieceWithPosition[] {
        const currentPlayerKing = getPlayerKing(currentPlayer, board);

        const movesCheckingCurrentPlayerKing = availableEnemyMovesIgnoringKingSafety.filter(move => arePositionsEqual(move.to, currentPlayerKing.position));
        const distinctAttackerPositions = movesCheckingCurrentPlayerKing.map(move => move.from).reduce((distinctAttackerPositions, nextAttackerPosition) => {
            const isNewPosition = !distinctAttackerPositions.some(existingPosition => arePositionsEqual(existingPosition, nextAttackerPosition));

            return isNewPosition ?
                [...distinctAttackerPositions, nextAttackerPosition] :
                distinctAttackerPositions;
        }, [] as Position[]);


        return distinctAttackerPositions.map(position => {
            const piece = board[position.file][position.rank] as Piece;

            return {
                ...piece,
                position,
            };
        })
    }
}
