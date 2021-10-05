import { ChessFile } from "../positions";
import { arePositionsEqual } from "./arePositionsEqual";

describe('arePositionsEqual', () => {
    it('returns true when both coordinates of both positions are the same', () => {
        expect(arePositionsEqual({ file: ChessFile.A, rank: 1 }, { file: ChessFile.A, rank: 1 })).toEqual(true);
    });

    it('returns false when files are the same but ranks aren\'t', () => {
        expect(arePositionsEqual({ file: ChessFile.A, rank: 1 }, { file: ChessFile.A, rank: 2 })).toEqual(false);
    });

    it('returns false when ranks are the same but files aren\'t', () => {
        expect(arePositionsEqual({ file: ChessFile.A, rank: 1 }, { file: ChessFile.B, rank: 1 })).toEqual(false);
    });

    it('returns false when both files and ranks are different', () => {
        expect(arePositionsEqual({ file: ChessFile.A, rank: 1 }, { file: ChessFile.B, rank: 2 })).toEqual(false);
    });
});
