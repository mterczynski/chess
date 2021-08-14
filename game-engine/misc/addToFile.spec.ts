import { addToFile } from "./addToFile";
import { ChessFile } from "../positions";

describe('addToFile', () => {
    it('should not allow floating point numbers', () => {
        expect(() => addToFile(ChessFile.A, 2.2)).toThrow();
    });

    it('should be able to move forward in files', () => {
        expect(addToFile(ChessFile.A, 2)).toEqual(ChessFile.C);
    });

    it('should be able to move backward in files', () => {
        expect(addToFile(ChessFile.C, -2)).toEqual(ChessFile.A);
    });

    describe('should return null if new file doesnt exist', () => {
        test('for backward movement', () => {
            expect(addToFile(ChessFile.A, -1)).toEqual(null);
        });

        test('for forward movement', () => {
            expect(addToFile(ChessFile.H, 1)).toEqual(null);
        });
    });
});
