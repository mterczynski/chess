import { CaptureIfAvailableBot } from "./CaptureIfAvailableBot";
import { Player } from "../Player";
import { PieceType } from "../pieces";
import { Move } from "../Moves";
import { ChessFile } from "../positions/ChessFile";
import { getEmptyBoard } from "game-engine/test-utils/getEmptyBoard";

describe("CaptureIfAvailableBot", () => {
    it("captures the highest priority piece (queen over rook)", () => {
        const board = getEmptyBoard();
        board[ChessFile.A][1] = { type: PieceType.QUEEN, player: Player.WHITE };
        board[ChessFile.C][3] = {
            type: PieceType.ROOK,
            player: Player.BLACK,
            hasMoved: false,
        };
        board[ChessFile.A][4] = { type: PieceType.QUEEN, player: Player.BLACK };
        const moves: Move[] = [
            {
                from: { file: ChessFile.A, rank: 1 },
                to: { file: ChessFile.A, rank: 4 },
            },
            {
                from: { file: ChessFile.A, rank: 1 },
                to: { file: ChessFile.C, rank: 3 },
            },
        ];
        const bot = new CaptureIfAvailableBot();
        const move = bot.makeMove(board, moves, Player.WHITE);
        expect(move.to).toEqual({ file: ChessFile.A, rank: 4 });
    });

    it("captures bishop/knight over pawn if no queen/rook", () => {
        const board = getEmptyBoard();
        board[ChessFile.A][1] = { type: PieceType.QUEEN, player: Player.WHITE };
        board[ChessFile.C][3] = {
            type: PieceType.BISHOP,
            player: Player.BLACK,
        };
        board[ChessFile.A][4] = { type: PieceType.PAWN, player: Player.BLACK };
        const moves: Move[] = [
            {
                from: { file: ChessFile.A, rank: 1 },
                to: { file: ChessFile.C, rank: 3 },
            },
            {
                from: { file: ChessFile.A, rank: 1 },
                to: { file: ChessFile.D, rank: 4 },
            },
        ];
        const bot = new CaptureIfAvailableBot();
        const move = bot.makeMove(board, moves, Player.WHITE);
        expect(move.to).toEqual({ file: ChessFile.C, rank: 3 }); // Bishop
    });

    it("makes a random move if no captures are available", () => {
        const board = getEmptyBoard();
        board[ChessFile.A][1] = { type: PieceType.QUEEN, player: Player.WHITE };
        board[ChessFile.B][1] = {
            type: PieceType.BISHOP,
            player: Player.WHITE,
        };

        const moves: Move[] = [
            {
                from: { file: ChessFile.A, rank: 1 },
                to: { file: ChessFile.A, rank: 2 },
            },
            {
                from: { file: ChessFile.B, rank: 1 },
                to: { file: ChessFile.B, rank: 2 },
            },
        ];
        const bot = new CaptureIfAvailableBot();
        const move = bot.makeMove(board, moves, Player.WHITE);
        expect(moves).toContainEqual(move);
    });
});
