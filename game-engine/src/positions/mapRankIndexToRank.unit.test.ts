import { mapRankIndexToRank } from "./mapRankIndexToRank";

describe("mapRankIndexToRank", () => {
    it("maps 0 to 1", () => {
        expect(mapRankIndexToRank(0)).toBe(1);
    });

    it("maps 1 to 2", () => {
        expect(mapRankIndexToRank(1)).toBe(2);
    });

    it("maps 7 to 8", () => {
        expect(mapRankIndexToRank(7)).toBe(8);
    });

    it("throws an error for negative numbers", () => {
        expect(() => mapRankIndexToRank(-1)).toThrow();
    });

    it("throws an error for numbers bigger than board size", () => {
        expect(() => mapRankIndexToRank(8)).toThrow();
    });
});
