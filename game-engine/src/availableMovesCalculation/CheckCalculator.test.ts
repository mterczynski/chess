import { CheckCalculator } from "./CheckCalculator";
import { Board } from "../Board";
import { Player } from "../Player";
import { ChessFile } from "../positions/ChessFile";
import { PieceType } from "../pieces";
import { Move } from "../Moves";

describe("CheckCalculator", () => {
    function makeEmptyBoard(): Board {
        return Object.fromEntries(
            Object.values(ChessFile).map((file) => [file, Array(8).fill(null)])
        ) as Board;
    }

    it("returns the checking piece when a single enemy piece checks the king", () => {
        const board = makeEmptyBoard();
        // Place white king on E1
        board[ChessFile.E][1] = { type: PieceType.KING, player: Player.WHITE, hasMoved: true };
        // Place black rook on E8
        board[ChessFile.E][8] = { type: PieceType.ROOK, player: Player.BLACK, hasMoved: false };
        // Black rook can move to E1 (check)
        const moves: Move[] = [
            { from: { file: ChessFile.E, rank: 8 }, to: { file: ChessFile.E, rank: 1 } }
        ];
        const result = new CheckCalculator().getCheckingEnemyPieces(Player.WHITE, board, moves);
        expect(result).toEqual([
            { type: PieceType.ROOK, player: Player.BLACK, hasMoved: false, position: { file: ChessFile.E, rank: 8 } }
        ]);
    });

    it("returns multiple checking pieces if more than one enemy attacks the king", () => {
        const board = makeEmptyBoard();
        // Place white king on E1
        board[ChessFile.E][1] = { type: PieceType.KING, player: Player.WHITE, hasMoved: true }
        // Place black rook on E8 and black queen on E2
        board[ChessFile.B][1] = { type: PieceType.ROOK, player: Player.BLACK, hasMoved: true}
        board[ChessFile.H][1] = { type: PieceType.QUEEN, player: Player.BLACK }

        const moves: Move[] = [
            { from: { file: ChessFile.B, rank: 1 }, to: { file: ChessFile.E, rank: 1 } },
            { from: { file: ChessFile.H, rank: 1 }, to: { file: ChessFile.E, rank: 1 } }
        ];
        const result = new CheckCalculator().getCheckingEnemyPieces(Player.WHITE, board, moves);
        // Check that both expected attackers are present and only those
        const expected = [
            { type: PieceType.ROOK, player: Player.BLACK, hasMoved: true, position: { file: ChessFile.B, rank: 1 } },
            { type: PieceType.QUEEN, player: Player.BLACK, position: { file: ChessFile.H, rank: 1 } }
        ];
        console.log('## result', result)
        expect(result).toEqual(expect.arrayContaining(expected));
        expect(result.length).toBe(2);
    });

    it("returns an empty array if no enemy piece checks the king", () => {
        const board = makeEmptyBoard();
        board[ChessFile.E][1] = { type: PieceType.KING, player: Player.WHITE, hasMoved: true };
        board[ChessFile.E][4] = { type: PieceType.PAWN, player: Player.BLACK };
        const moves: Move[] = [
            { from: { file: ChessFile.E, rank: 4 }, to: { file: ChessFile.E, rank: 3 } }
        ];
        const result = new CheckCalculator().getCheckingEnemyPieces(Player.WHITE, board, moves);
        expect(result.length).toBe(0);
    });
});
