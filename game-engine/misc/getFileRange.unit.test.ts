import { ChessFile } from "../positions"
import { getFileRange } from "./getFileRange"

describe('getFileRange', () => {
    it('returns all files withing specifc range', () => {
        expect(getFileRange(ChessFile.A, ChessFile.D)).toEqual([ChessFile.A, ChessFile.B, ChessFile.C, ChessFile.D]);
    });

    it('works in reverse', () => {
        expect(getFileRange(ChessFile.C, ChessFile.A)).toEqual([ChessFile.A, ChessFile.B, ChessFile.C]);
    });


    it('works for same files', () => {
        expect(getFileRange(ChessFile.H, ChessFile.H)).toEqual([ChessFile.H]);
    });

    it('returns all files withing specific range, excluding from and to when inclusive = false', () => {
        expect(getFileRange(ChessFile.A, ChessFile.D, { inclusive: false })).toEqual([ChessFile.B, ChessFile.C]);
    });
});
