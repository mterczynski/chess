import { Board } from "./Board"
import { createNewBoard } from "./createNewBoard"
import { PieceType } from "./pieces"
import { Player } from "./Player"
import { ChessFile } from "./positions"

describe('createNewBoard', () => {
    it('should create board ready for new game', () => {
        const expectedBoard: Board = {
            [ChessFile.A]: [
                null,
                {player: Player.WHITE, type: PieceType.ROOK, hasMoved: false}, {player: Player.WHITE, type: PieceType.PAWN},
                null, null, null, null,
                {player: Player.BLACK, type: PieceType.PAWN}, {player: Player.BLACK, type: PieceType.ROOK, hasMoved: false}
            ],
            [ChessFile.B]: [
                null,
                {player: Player.WHITE, type: PieceType.KNIGHT}, {player: Player.WHITE, type: PieceType.PAWN},
                null, null, null, null,
                {player: Player.BLACK, type: PieceType.PAWN}, {player: Player.BLACK, type: PieceType.KNIGHT}
            ],
            [ChessFile.C]: [
                null,
                {player: Player.WHITE, type: PieceType.BISHOP}, {player: Player.WHITE, type: PieceType.PAWN},
                null, null, null, null,
                {player: Player.BLACK, type: PieceType.PAWN}, {player: Player.BLACK, type: PieceType.BISHOP}
            ],
            [ChessFile.D]: [
                null,
                {player: Player.WHITE, type: PieceType.QUEEN}, {player: Player.WHITE, type: PieceType.PAWN},
                null, null, null, null,
                {player: Player.BLACK, type: PieceType.PAWN}, {player: Player.BLACK, type: PieceType.QUEEN}
            ],
            [ChessFile.E]: [
                null,
                {player: Player.WHITE, type: PieceType.KING, hasMoved: false}, {player: Player.WHITE, type: PieceType.PAWN},
                null, null, null, null,
                {player: Player.BLACK, type: PieceType.PAWN}, {player: Player.BLACK, type: PieceType.KING, hasMoved: false}
            ],
            [ChessFile.F]: [
                null,
                {player: Player.WHITE, type: PieceType.BISHOP}, {player: Player.WHITE, type: PieceType.PAWN},
                null, null, null, null,
                {player: Player.BLACK, type: PieceType.PAWN}, {player: Player.BLACK, type: PieceType.BISHOP}
            ],
            [ChessFile.G]: [
                null,
                {player: Player.WHITE, type: PieceType.KNIGHT}, {player: Player.WHITE, type: PieceType.PAWN},
                null, null, null, null,
                {player: Player.BLACK, type: PieceType.PAWN}, {player: Player.BLACK, type: PieceType.KNIGHT}
            ],
            [ChessFile.H]: [
                null,
                {player: Player.WHITE, type: PieceType.ROOK, hasMoved: false}, {player: Player.WHITE, type: PieceType.PAWN},
                null, null, null, null,
                {player: Player.BLACK, type: PieceType.PAWN}, {player: Player.BLACK, type: PieceType.ROOK, hasMoved: false}
            ],
        }

        expect(createNewBoard()).toEqual(expectedBoard);
    })
})
