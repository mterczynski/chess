import { ChessFile } from "./ChessFile";
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

    describe('inclusive = false', () => {
        it('returns all files withing specific range, excluding from and to', () => {
            expect(getFileRange(ChessFile.A, ChessFile.D, { inclusive: false })).toEqual([ChessFile.B, ChessFile.C]);
        });

        it('returns empty array if the files are the same', () => {
            expect(getFileRange(ChessFile.D, ChessFile.D, { inclusive: false })).toEqual([]);
        });

        it('returns empty array if the files are adjacent', () => {
            expect(getFileRange(ChessFile.D, ChessFile.E, { inclusive: false })).toEqual([]);
        });
    });
});
