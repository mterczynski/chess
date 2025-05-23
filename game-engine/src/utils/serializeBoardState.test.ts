import { Board } from "../Board";
import { Player } from "../Player";
import { ChessFile } from "../positions/ChessFile";
import { serializeBoardState } from "./serializeBoardState";

describe("serializeBoardState", () => {
    it("serializes an empty board and player", () => {
        // Create an empty board
        const emptyBoard = Object.fromEntries(
            Object.values(ChessFile).map((file) => [file, Array(8).fill(null)])
        ) as Board;
        expect(serializeBoardState(emptyBoard, Player.WHITE)).toBe(
            "......../......../......../......../......../......../......../........_WHITE"
        );
        expect(serializeBoardState(emptyBoard, Player.BLACK)).toBe(
            "......../......../......../......../......../......../......../........_BLACK"
        );
    });

    it("serializes a board with a single piece", () => {
        const board = Object.fromEntries(
            Object.values(ChessFile).map((file) => [file, Array(8).fill(null)])
        ) as Board;
        board[ChessFile.E][0] = { type: "K", player: Player.WHITE } as any;
        expect(serializeBoardState(board, Player.WHITE)).toBe(
            "......../......../......../......../......../......../......../....K..._WHITE"
        );
    });

    it("serializes a standard initial board (partial check)", () => {
        // Only check that pawns and kings are present in the right places
        const board = Object.fromEntries(
            Object.values(ChessFile).map((file) => [file, Array(8).fill(null)])
        ) as Board;
        // Place white pawns
        Object.values(ChessFile).forEach((file) => {
            board[file][1] = { type: "P", player: Player.WHITE } as any;
        });
        // Place black pawns
        Object.values(ChessFile).forEach((file) => {
            board[file][6] = { type: "P", player: Player.BLACK } as any;
        });
        // Place kings
        board[ChessFile.E][0] = { type: "K", player: Player.WHITE } as any;
        board[ChessFile.E][7] = { type: "K", player: Player.BLACK } as any;
        expect(serializeBoardState(board, Player.WHITE)).toBe(
            "....k.../pppppppp/......../......../......../......../PPPPPPPP/....K..._WHITE"
        );
    });
});
