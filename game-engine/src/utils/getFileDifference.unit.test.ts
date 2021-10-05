import { ChessFile } from "../positions";
import { getFileDifference } from "./getFileDifference";

describe('getFileDifference', () => {
    it('returns 0 for the same files', () => {
        expect(getFileDifference(ChessFile.B, ChessFile.B)).toEqual(0);
    });

    it('returns -2 if the first file is 2 files away on the right side of the first file', () => {
        expect(getFileDifference(ChessFile.D, ChessFile.B)).toEqual(-2);
    });

    it('returns 3 if the first file is 3 files away on the left side of the first file', () => {
        expect(getFileDifference(ChessFile.E, ChessFile.H)).toEqual(3);
    });
})
