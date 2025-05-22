import { CaptureIfAvailableBot } from "./CaptureIfAvailableBot";
import { Player } from "../Player";
import { PieceType } from "../pieces";
import { Move } from "../Moves";
import { ChessFile } from "../positions/ChessFile";

function makeBoardWithTargets(targets: { file: ChessFile, rank: number, type: PieceType, player: Player }[]): any {
    const board: any = {};
    for (const file of Object.values(ChessFile)) {
        board[file] = [];
        for (let rank = 1; rank <= 8; rank++) {
            board[file][rank] = null;
        }
    }
    for (const t of targets) {
        board[t.file][t.rank] = { type: t.type, player: t.player };
    }
    return board;
}

describe("CaptureIfAvailableBot", () => {
    it("captures the highest priority piece (queen over rook)", () => {
        const board = makeBoardWithTargets([
            { file: ChessFile.C, rank: 3, type: PieceType.ROOK, player: Player.BLACK },
            { file: ChessFile.D, rank: 4, type: PieceType.QUEEN, player: Player.BLACK }
        ]);
        const moves: Move[] = [
            { from: { file: ChessFile.A, rank: 1 }, to: { file: ChessFile.C, rank: 3 }, isAttacking: true },
            { from: { file: ChessFile.A, rank: 1 }, to: { file: ChessFile.D, rank: 4 }, isAttacking: true }
        ];
        const bot = new CaptureIfAvailableBot();
        const move = bot.makeMove(board, moves, Player.WHITE);
        expect(move.to).toEqual({ file: ChessFile.D, rank: 4 }); // Queen
    });

    it("captures bishop/knight over pawn if no queen/rook", () => {
        const board = makeBoardWithTargets([
            { file: ChessFile.C, rank: 3, type: PieceType.BISHOP, player: Player.BLACK },
            { file: ChessFile.D, rank: 4, type: PieceType.PAWN, player: Player.BLACK }
        ]);
        const moves: Move[] = [
            { from: { file: ChessFile.A, rank: 1 }, to: { file: ChessFile.C, rank: 3 }, isAttacking: true },
            { from: { file: ChessFile.A, rank: 1 }, to: { file: ChessFile.D, rank: 4 }, isAttacking: true }
        ];
        const bot = new CaptureIfAvailableBot();
        const move = bot.makeMove(board, moves, Player.WHITE);
        expect(move.to).toEqual({ file: ChessFile.C, rank: 3 }); // Bishop
    });

    it("makes a random move if no captures are available", () => {
        const board = makeBoardWithTargets([]);
        const moves: Move[] = [
            { from: { file: ChessFile.A, rank: 1 }, to: { file: ChessFile.A, rank: 2 }, isAttacking: false },
            { from: { file: ChessFile.B, rank: 1 }, to: { file: ChessFile.B, rank: 2 }, isAttacking: false }
        ];
        const bot = new CaptureIfAvailableBot();
        const move = bot.makeMove(board, moves, Player.WHITE);
        expect(moves).toContainEqual(move);
    });
});
