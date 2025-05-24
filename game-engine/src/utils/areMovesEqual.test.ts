import { areMovesEqual } from "./areMovesEqual";
import { Move } from "../Moves";
import { ChessFile } from "../positions/ChessFile";

describe("areMovesEqual", () => {
    const baseMove: Move = {
        from: { file: ChessFile.E, rank: 2 },
        to: { file: ChessFile.E, rank: 4 }
    };

    it("returns true for identical moves", () => {
        const sameMove: Move = {
            from: { file: ChessFile.E, rank: 2 },
            to: { file: ChessFile.E, rank: 4 },
        };
        expect(areMovesEqual(baseMove, sameMove)).toBe(true);
    });

    it("returns false if from.rank differs", () => {
        expect(areMovesEqual(baseMove, {
            ...baseMove,
            from: {...baseMove.from, rank: 3 }
        })).toBe(false);
    });

    it("returns false if from.file differs", () => {
        expect(areMovesEqual(baseMove, {
            ...baseMove,
            from: {...baseMove.from, file: ChessFile.F }
        })).toBe(false);
    });

    it("returns false if to.rank differs", () => {
        expect(areMovesEqual(baseMove, {
            ...baseMove,
            to: {...baseMove.to, rank: 5 }
        })).toBe(false);
    });

     it("returns false if to.file differs", () => {
        expect(areMovesEqual(baseMove, {
            ...baseMove,
            to: {...baseMove.to, file: ChessFile.F }
        })).toBe(false);
    });
});
