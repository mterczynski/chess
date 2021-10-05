import { mapIndexToChessFile } from "./mapIndexToChessFile";
import { ChessFile } from "../positions";

describe('mapIndexToChessFile', () => {
    it('maps 0 to A', () => {
        expect(mapIndexToChessFile(0)).toBe(ChessFile.A);
    });

    it('maps 1 to B', () => {
        expect(mapIndexToChessFile(1)).toBe(ChessFile.B);
    });

    it('maps 2 to C', () => {
        expect(mapIndexToChessFile(2)).toBe(ChessFile.C);
    });

    it('maps 3 to D', () => {
        expect(mapIndexToChessFile(3)).toBe(ChessFile.D);
    });

    it('maps 4 to E', () => {
        expect(mapIndexToChessFile(4)).toBe(ChessFile.E);
    });

    it('maps 5 to F', () => {
        expect(mapIndexToChessFile(5)).toBe(ChessFile.F);
    });

    it('maps 6 to G', () => {
        expect(mapIndexToChessFile(6)).toBe(ChessFile.G);
    });

    it('maps 7 to H', () => {
        expect(mapIndexToChessFile(7)).toBe(ChessFile.H);
    });

    it('throws an error for negative numbers', () => {
        expect(() => mapIndexToChessFile(-1)).toThrow();
    });

    it('throws an error for numbers bigger than board size', () => {
        expect(() => mapIndexToChessFile(8)).toThrow();
    });
})
