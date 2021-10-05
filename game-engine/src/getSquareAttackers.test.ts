import { getSquareAttackers } from "./getSquareAttackers";
import { PieceType, PieceWithPosition } from "./pieces";
import { Player } from "./Player";
import { ChessFile } from "./positions";
import { getEmptyBoard } from "../test-utils/getEmptyBoard";

describe('getSquareAttackers', () => {
    it('should return list of square atackers of specific player together with their positions', () => {
        const board = getEmptyBoard();

        board[ChessFile.A][6] = { player: Player.BLACK, type: PieceType.KNIGHT };
        board[ChessFile.F][8] = { player: Player.BLACK, type: PieceType.BISHOP };
        board[ChessFile.H][5] = { player: Player.BLACK, type: PieceType.QUEEN };
        board[ChessFile.C][1] = { player: Player.BLACK, type: PieceType.ROOK, hasMoved: true };
        board[ChessFile.B][4] = { player: Player.BLACK, type: PieceType.KING, hasMoved: true };
        board[ChessFile.B][6] = { player: Player.BLACK, type: PieceType.PAWN };

        const expectedAttackers: PieceWithPosition[] = [
            { player: Player.BLACK, type: PieceType.KNIGHT, position: { file: ChessFile.A, rank: 6 } },
            { player: Player.BLACK, type: PieceType.BISHOP, position: { file: ChessFile.F, rank: 8 } },
            { player: Player.BLACK, type: PieceType.QUEEN, position: { file: ChessFile.H, rank: 5 } },
            { player: Player.BLACK, type: PieceType.ROOK, hasMoved: true, position: { file: ChessFile.C, rank: 1 } },
            { player: Player.BLACK, type: PieceType.KING, hasMoved: true, position: { file: ChessFile.B, rank: 4 } },
            { player: Player.BLACK, type: PieceType.PAWN, position: { file: ChessFile.B, rank: 6 } },
        ];
        const attacker = Player.BLACK;
        const result = getSquareAttackers({ file: ChessFile.C, rank: 5 }, board, attacker);

        expect(result).toEqual(expect.arrayContaining(expectedAttackers));
        expect(result.length).toEqual(6);
    });
});
