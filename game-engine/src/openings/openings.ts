import { Move } from "../Moves";
import { ChessFile } from "../positions";

export interface Opening {
    name: string;
    moves: Move[];
}

export const openings: Opening[] = [
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
    {
        name: "Polish Opening: Grigorian Variation",
        moves: [
            { from: { file: ChessFile.B, rank: 2 }, to: { file: ChessFile.B, rank: 4 } },
            { from: { file: ChessFile.B, rank: 8 }, to: { file: ChessFile.C, rank: 6 } },
        ],
    },
    {
        name: "Saragossa Opening",
        moves: [
            { from: { file: ChessFile.C, rank: 2 }, to: { file: ChessFile.C, rank: 3 } },
        ],
    },
    {
        name: "Mieses Opening",
        moves: [
            { from: { file: ChessFile.D, rank: 2 }, to: { file: ChessFile.D, rank: 3 } },
        ],
    },
    {
        name: "Valencia Opening",
        moves: [
            { from: { file: ChessFile.D, rank: 2 }, to: { file: ChessFile.D, rank: 3 } },
            { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 5 } },
            { from: { file: ChessFile.B, rank: 1 }, to: { file: ChessFile.D, rank: 2 } },
        ],
    },
    {
        name: "Van't Kruijs Opening",
        moves: [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 3 } },
        ],
    },
    {
        name: "Barnes Opening",
        moves: [
            { from: { file: ChessFile.F, rank: 2 }, to: { file: ChessFile.F, rank: 3 } },
        ],
    },
    {
        name: "Scandinavian Defense",
        moves: [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.D, rank: 7 }, to: { file: ChessFile.D, rank: 5 } },
        ],
    },
    {
        name: "Polish Opening",
        moves: [
            { from: { file: ChessFile.B, rank: 2 }, to: { file: ChessFile.B, rank: 4 } },
        ],
    },
    // todo - allow Four Knights Game to start from both Petrov and Italian Game
    {
        name: "Four Knights Game",
        moves: [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 5 } },
            { from: { file: ChessFile.G, rank: 1 }, to: { file: ChessFile.F, rank: 3 } },
            { from: { file: ChessFile.G, rank: 8 }, to: { file: ChessFile.F, rank: 6 } },
            { from: { file: ChessFile.B, rank: 1 }, to: { file: ChessFile.C, rank: 3 } },
            { from: { file: ChessFile.B, rank: 8 }, to: { file: ChessFile.C, rank: 6 } },
        ],
    },
    {
        name: "Pirc Defense",
        moves: [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.D, rank: 7 }, to: { file: ChessFile.D, rank: 6 } },
            { from: { file: ChessFile.D, rank: 2 }, to: { file: ChessFile.D, rank: 4 } },
            { from: { file: ChessFile.G, rank: 8 }, to: { file: ChessFile.F, rank: 6 } },
        ],
    },
    {
        name: "Alekhine's Defense",
        moves: [
            { from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } },
            { from: { file: ChessFile.G, rank: 8 }, to: { file: ChessFile.F, rank: 6 } },
        ],
    },
    {
        name: "Nimzo-Indian Defense",
        moves: [
            { from: { file: ChessFile.D, rank: 2 }, to: { file: ChessFile.D, rank: 4 } },
            { from: { file: ChessFile.G, rank: 8 }, to: { file: ChessFile.F, rank: 6 } },
            { from: { file: ChessFile.C, rank: 2 }, to: { file: ChessFile.C, rank: 4 } },
            { from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 6 } },
            { from: { file: ChessFile.B, rank: 1 }, to: { file: ChessFile.C, rank: 3 } },
            { from: { file: ChessFile.B, rank: 8 }, to: { file: ChessFile.B, rank: 6 } },
            { from: { file: ChessFile.C, rank: 1 }, to: { file: ChessFile.G, rank: 5 } },
        ],
    },
    {
        name: "Dutch Defense",
        moves: [
            { from: { file: ChessFile.D, rank: 2 }, to: { file: ChessFile.D, rank: 4 } },
            { from: { file: ChessFile.F, rank: 7 }, to: { file: ChessFile.F, rank: 5 } },
        ],
    },
    {
        name: "London System",
        moves: [
            { from: { file: ChessFile.D, rank: 2 }, to: { file: ChessFile.D, rank: 4 } },
            { from: { file: ChessFile.D, rank: 7 }, to: { file: ChessFile.D, rank: 5 } },
            { from: { file: ChessFile.B, rank: 1 }, to: { file: ChessFile.F, rank: 4 } },
        ],
    },
    {
        name: "Reti Opening",
        moves: [
            { from: { file: ChessFile.G, rank: 1 }, to: { file: ChessFile.F, rank: 3 } },
        ],
    },
    {
        name: "Grob Attack",
        moves: [
            { from: { file: ChessFile.G, rank: 2 }, to: { file: ChessFile.G, rank: 4 } },
        ],
    },
];
