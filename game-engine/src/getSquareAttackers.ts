import _ from "lodash";
import { AvailableMoveCalculator } from "./availableMovesCalculation";
import { Board } from "./Board";
import { negatePlayer } from "./misc";
import { getPlayerPieces, PieceType, PieceWithPosition } from "./pieces";
import { Player } from "./Player";
import { Position } from "./positions";

export function getSquareAttackers(squarePosition: Position, board: Board, attacker: Player): PieceWithPosition[] {
    const boardClone = _.cloneDeep(board);
    // add any piece of enemy of attacker for making sure that all desired pawn attacks are included
    boardClone[squarePosition.file][squarePosition.rank] = {player: negatePlayer(attacker), type: PieceType.QUEEN};

    const attackerPieces = getPlayerPieces(boardClone, attacker);
    // lastMove set to null - no need to calculate en passant attacks
    const attackerMoves = new AvailableMoveCalculator().getAvailableMovesForPlayer(board, attacker, null);

    return attackerPieces.filter(piece => attackerMoves.some(move => _.isEqual(move.from, piece.position)))
}
