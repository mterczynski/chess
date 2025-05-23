import { ChessFile } from "../positions";

export const openings = [
    {
        name: "Ruy Lopez",
        moves: [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 5 } },
            { from: { file: ChessFile.G, rank: 1 }, to: { file: ChessFile.F, rank: 3 } },
            { from: { file: ChessFile.B, rank: 8 }, to: { file: ChessFile.C, rank: 6 } },
            { from: { file: ChessFile.F, rank: 1 }, to: { file: ChessFile.B, rank: 5 } },
        ],
    },
    {
        name: "Sicilian Defense",
        moves: [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.C, rank: 7 }, to: { file: ChessFile.C, rank: 5 } },
        ],
    },
    {
        name: "Scotch Game",
        moves: [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 5 } },
            { from: { file: ChessFile.G, rank: 1 }, to: { file: ChessFile.F, rank: 3 } },
            { from: { file: ChessFile.B, rank: 8 }, to: { file: ChessFile.C, rank: 6 } },
            { from: { file: ChessFile.D, rank: 2 }, to: { file: ChessFile.D, rank: 4 } },
        ],
    },
    {
        name: "Italian Game",
        moves: [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 5 } },
            { from: { file: ChessFile.G, rank: 1 }, to: { file: ChessFile.F, rank: 3 } },
            { from: { file: ChessFile.B, rank: 8 }, to: { file: ChessFile.C, rank: 6 } },
            { from: { file: ChessFile.F, rank: 1 }, to: { file: ChessFile.C, rank: 4 } },
        ],
    },
    {
        name: "French Defense",
        moves: [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 6 } },
        ],
    },
    {
        name: "Caro-Kann Defense",
        moves: [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.C, rank: 7 }, to: { file: ChessFile.C, rank: 6 } },
        ],
    },
    {
        name: "Queen's Gambit",
        moves: [
            { from: { file: ChessFile.D, rank: 2 }, to: { file: ChessFile.D, rank: 4 } },
            { from: { file: ChessFile.D, rank: 7 }, to: { file: ChessFile.D, rank: 5 } },
            { from: { file: ChessFile.C, rank: 2 }, to: { file: ChessFile.C, rank: 4 } },
        ],
    },
    {
        name: "King's Indian Defense",
        moves: [
            { from: { file: ChessFile.D, rank: 2 }, to: { file: ChessFile.D, rank: 4 } },
            { from: { file: ChessFile.G, rank: 8 }, to: { file: ChessFile.F, rank: 6 } },
            { from: { file: ChessFile.C, rank: 2 }, to: { file: ChessFile.C, rank: 4 } },
            { from: { file: ChessFile.G, rank: 7 }, to: { file: ChessFile.G, rank: 6 } },
        ],
    },
    {
        name: "English Opening",
        moves: [
            { from: { file: ChessFile.C, rank: 2 }, to: { file: ChessFile.C, rank: 4 } },
        ],
    },
    {
        name: "King's Gambit",
        moves: [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 5 } },
            { from: { file: ChessFile.F, rank: 2 }, to: { file: ChessFile.F, rank: 4 } },
        ],
    },
    {
        name: "Vienna Game",
        moves: [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 5 } },
            { from: { file: ChessFile.B, rank: 1 }, to: { file: ChessFile.C, rank: 3 } },
        ],
    },
    {
        name: "Petrov's Defense",
        moves: [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 5 } },
            { from: { file: ChessFile.G, rank: 1 }, to: { file: ChessFile.F, rank: 3 } },
            { from: { file: ChessFile.G, rank: 8 }, to: { file: ChessFile.F, rank: 6 } },
        ],
    },
];
