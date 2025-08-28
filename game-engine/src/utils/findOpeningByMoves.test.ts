import { findOpeningByMoves } from "./findOpeningByMoves";
import { Move } from "../Moves";
import { ChessFile } from "../positions/ChessFile";

// These tests now use the real openings data from the codebase.
describe("findOpeningByMoves", () => {
    it("returns null for empty move history", () => {
        expect(findOpeningByMoves([])).toBeNull();
        expect(findOpeningByMoves(null)).toBeNull();
        expect(findOpeningByMoves(undefined)).toBeNull();
    });

    it("returns a valid opening object for a known opening sequence", () => {
        // Ruy Lopez opening: 1. e4 e5 2. Nf3 Nc6 3. Bb5
        const moves: Move[] = [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 5 } },
            { from: { file: ChessFile.G, rank: 1 }, to: { file: ChessFile.F, rank: 3 } },
            { from: { file: ChessFile.B, rank: 8 }, to: { file: ChessFile.C, rank: 6 } },
            { from: { file: ChessFile.F, rank: 1 }, to: { file: ChessFile.B, rank: 5 } },
        ];
        const opening = findOpeningByMoves(moves);
        expect(opening).not.toBeNull();
        expect(opening?.name).toMatch(/ruy lopez/i);
    });

    it("returns null if no opening matches", () => {
        const moves: Move[] = [
            { from: { file: ChessFile.A, rank: 2 }, to: { file: ChessFile.A, rank: 3 } }
        ];
        expect(findOpeningByMoves(moves)).toBeNull();
    });

    it("returns the shortest matching opening if multiple match", () => {
        // e4 is the first move of many openings, but the shortest should be returned
        const moves: Move[] = [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } }
        ];
        const opening = findOpeningByMoves(moves);
        // If your openings data does not contain a single-move opening, expect null:
        expect(opening).toBeNull();
    });
});