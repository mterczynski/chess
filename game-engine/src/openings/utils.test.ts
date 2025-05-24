import { findOpeningByMoves } from "./utils";
import { ChessFile } from "../positions";
import { Move } from "../Moves";
import { Opening } from "./openings";

describe("findOpeningByMoves", () => {
    const openings: Opening[] = [
        {
            name: "Long Opening",
            moves: [
                { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
                { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 5 } },
            ],
        },
        {
            name: "Short Opening",
            moves: [
                { from: { file: ChessFile.D, rank: 2 }, to: { file: ChessFile.D, rank: 4 } },
            ],
        },
    ];

    it("returns null for empty move history", () => {
        expect(findOpeningByMoves([], openings)).toBeNull();
    });

    it("returns null if no opening matches", () => {
        const moves: Move[] = [
            { from: { file: ChessFile.A, rank: 2 }, to: { file: ChessFile.A, rank: 3 } },
        ];
        expect(findOpeningByMoves(moves, openings)).toBeNull();
    });

    it("returns the correct opening for an exact match", () => {
        const moves: Move[] = [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 5 } },
        ];
        expect(findOpeningByMoves(moves, openings)).toBe("Long Opening");
    });

    describe(`Queen's Gambit - 2 ways`, () => {
        const englishOpening: Opening =  {
            name: "English Opening",
            moves: [
                { from: { file: ChessFile.C, rank: 2 }, to: { file: ChessFile.C, rank: 4 } },
            ],
        }
        const queensPawnOpening: Opening =  {
            name: "Queen's Pawn Opening",
            moves: [
                { from: { file: ChessFile.D, rank: 2 }, to: { file: ChessFile.D, rank: 4 } },
            ],
        }
        const queenGambitOpening: Opening = {
            name: "Queen's Gambit",
            moves: [
                ...queensPawnOpening.moves,
                { from: { file: ChessFile.D, rank: 7 }, to: { file: ChessFile.D, rank: 5 } },
                { from: { file: ChessFile.C, rank: 2 }, to: { file: ChessFile.C, rank: 4 } },
                { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 6 } },
                { from: { file: ChessFile.B, rank: 1 }, to: { file: ChessFile.C, rank: 3 } },
                { from: { file: ChessFile.G, rank: 8 }, to: { file: ChessFile.F, rank: 6 } },
            ],
        }
        const openings: Opening[] = [
            englishOpening,
            queensPawnOpening,
            queenGambitOpening
        ];

        it("returns the Queen's Gambit opening when achieved from Queen's Pawn Opening", () => {
            expect(findOpeningByMoves(queenGambitOpening.moves, openings)).toBe("Queen's Gambit");
        });

        it("returns the Queen's Gambit opening when achieved from English Opening", () => {
             const queensGambitFromEnglishMoves: Move[] = [
                ...englishOpening.moves,
                { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 6 } }, // 1...e6
                { from: { file: ChessFile.B, rank: 1 }, to: { file: ChessFile.C, rank: 3 } }, // 2. Nc3
                { from: { file: ChessFile.G, rank: 8 }, to: { file: ChessFile.F, rank: 6 } }, // 2...Nf6
                { from: { file: ChessFile.D, rank: 2 }, to: { file: ChessFile.D, rank: 4 } }, // 3. d4
                { from: { file: ChessFile.D, rank: 7 }, to: { file: ChessFile.D, rank: 5 } }, // 3...d5
            ]
            expect(findOpeningByMoves(queensGambitFromEnglishMoves, openings)).toBe("Queen's Gambit");
        });
    })


    it("returns the longest matching opening if multiple match", () => {
        const moves: Move[] = [
            { from: { file: ChessFile.D, rank: 2 }, to: { file: ChessFile.D, rank: 4 } },
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 5 } },
        ];
        // Only "Short Opening" matches the prefix
        expect(findOpeningByMoves(moves, openings)).toBe("Long Opening");
    });
});
