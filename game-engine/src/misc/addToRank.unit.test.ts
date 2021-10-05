import { addToRank } from "./addToRank";

describe('addToRank', () => {
    it('should not allow floating point numbers', () => {
        expect(() => addToRank(1, 2.2)).toThrow();
    });

    it('should be able to move forward in ranks', () => {
        expect(addToRank(7, 1)).toEqual(8);
    });

    it('should be able to move backward in ranks', () => {
        expect(addToRank(3, -2)).toEqual(1);
    });

    describe('should return null if new ranks doesnt exist', () => {
        test('for backward movement', () => {
            expect(addToRank(1, -1)).toEqual(null);
        });

        test('for forward movement', () => {
            expect(addToRank(8, 1)).toEqual(null);
        });
    });
});
