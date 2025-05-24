import { isAttackingMove } from "./isAttackingMove";
import { Board } from "../Board";
import { Player } from "../Player";
import { Move, SpecialMoveType } from "../Moves";
import { PieceType } from "../pieces";
import { ChessFile } from "../positions/ChessFile";
import { getEmptyBoard } from "game-engine/test-utils/getEmptyBoard";

describe("isAttackingMove", () => {
    it("returns false for a non-attacking move to an empty square", () => {
        const board: Board = getEmptyBoard();
        board[ChessFile.B][2] = { player: Player.WHITE, type: PieceType.PAWN };
        // White pawn moves forward (not attacking)
        const move: Move = {
            from: { file: ChessFile.B, rank: 2 },
            to: { file: ChessFile.B, rank: 3 },
        };
        expect(isAttackingMove(move, board)).toBe(false);
    });

    it("returns true for a move to a square with an enemy piece (pawn diagonal attack)", () => {
        const board: Board = getEmptyBoard();
        board[ChessFile.B][2] = { player: Player.WHITE, type: PieceType.PAWN };
        board[ChessFile.C][3] = { player: Player.BLACK, type: PieceType.PAWN };
        // White pawn attacks diagonally
        const move: Move = {
            from: { file: ChessFile.B, rank: 2 },
            to: { file: ChessFile.C, rank: 3 },
        };
        expect(isAttackingMove(move, board)).toBe(true);
    });

    it("returns true for an en passant move", () => {
        const board: Board = getEmptyBoard();
        board[ChessFile.E][5] = { player: Player.WHITE, type: PieceType.PAWN };
        board[ChessFile.D][5] = { player: Player.BLACK, type: PieceType.PAWN };
        // White pawn captures black pawn en passant
        const move: Move = {
            from: { file: ChessFile.E, rank: 5 },
            to: { file: ChessFile.D, rank: 6 },
            type: SpecialMoveType.EN_PASSANT,
        };
        expect(isAttackingMove(move, board)).toBe(true);
    });

    it("throws if the source piece does not exist", () => {
        const board: Board = getEmptyBoard();
        // No pawn at source
        const move: Move = {
            from: { file: ChessFile.B, rank: 2 },
            to: { file: ChessFile.C, rank: 3 },
        };
        expect(() => isAttackingMove(move, board)).toThrow();
    });
});
