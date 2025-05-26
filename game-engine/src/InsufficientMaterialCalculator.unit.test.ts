import { InsufficientMaterialCalculator } from "./InsufficientMaterialCalculator";
import { Piece, PieceType } from "./pieces";
import { getEmptyBoard } from "game-engine/test-utils/getEmptyBoard";

describe("InsufficientMaterialCalculator", () => {
    it("returns true for only kings", () => {
        const board = getEmptyBoard();
        board.A[1] = { type: PieceType.KING, player: "WHITE" } as Piece;
        board.H[8] = { type: PieceType.KING, player: "BLACK" } as Piece;
        expect(InsufficientMaterialCalculator.isInsufficientMaterial(board)).toBe(true);
    });

    it("returns true for king and bishop vs king", () => {
        const board = getEmptyBoard();
        board.A[1] = { type: PieceType.KING, player: "WHITE" } as Piece;
        board.H[8] = { type: PieceType.KING, player: "BLACK" } as Piece;
        board.B[2] = { type: PieceType.BISHOP, player: "WHITE" } as Piece;
        expect(InsufficientMaterialCalculator.isInsufficientMaterial(board)).toBe(true);
    });

    it("returns true for king and knight vs king", () => {
        const board = getEmptyBoard();
        board.A[1] = { type: PieceType.KING, player: "WHITE" } as Piece;
        board.H[8] = { type: PieceType.KING, player: "BLACK" } as Piece;
        board.B[2] = { type: PieceType.KNIGHT, player: "WHITE" } as Piece;
        expect(InsufficientMaterialCalculator.isInsufficientMaterial(board)).toBe(true);
    });

    it("returns true for king and bishop vs king and bishop (same color)", () => {
        const board = getEmptyBoard();
        board.A[1] = { type: PieceType.KING, player: "WHITE" } as Piece;
        board.H[8] = { type: PieceType.KING, player: "BLACK" } as Piece;
        board.B[2] = { type: PieceType.BISHOP, player: "WHITE" } as Piece; // dark square
        board.D[4] = { type: PieceType.BISHOP, player: "BLACK" } as Piece; // dark square
        expect(InsufficientMaterialCalculator.isInsufficientMaterial(board)).toBe(true);
    });

    it("returns false for king and bishop vs king and bishop (different color)", () => {
        const board = getEmptyBoard();
        board.A[1] = { type: PieceType.KING, player: "WHITE" } as Piece;
        board.H[8] = { type: PieceType.KING, player: "BLACK" } as Piece;
        board.B[2] = { type: PieceType.BISHOP, player: "WHITE" } as Piece; // dark square
        board.C[2] = { type: PieceType.BISHOP, player: "BLACK" } as Piece; // light square
        expect(InsufficientMaterialCalculator.isInsufficientMaterial(board)).toBe(false);
    });

    it("returns false for king and queen vs king", () => {
        const board = getEmptyBoard();
        board.A[1] = { type: PieceType.KING, player: "WHITE" } as Piece;
        board.H[8] = { type: PieceType.KING, player: "BLACK" } as Piece;
        board.B[2] = { type: PieceType.QUEEN, player: "WHITE" } as Piece;
        expect(InsufficientMaterialCalculator.isInsufficientMaterial(board)).toBe(false);
    });
});
