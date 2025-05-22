import { RandomMoveBot } from "./RandomMoveBot";
import { Player } from "../Player";
import { Move } from "../Moves";
import { ChessFile } from "../positions/ChessFile";

describe("RandomMoveBot", () => {
    const dummyBoard = {} as any;

    it("returns the only available move", () => {
        const bot = new RandomMoveBot();
        const moves: Move[] = [
            { from: { file: ChessFile.A, rank: 2 }, to: { file: ChessFile.A, rank: 3 }, isAttacking: false }
        ];
        const move = bot.makeMove(dummyBoard, moves, Player.WHITE);
        expect(move).toEqual(moves[0]);
    });

    it("returns one of the available moves when two moves are present", () => {
        const bot = new RandomMoveBot();
        const moves: Move[] = [
            { from: { file: ChessFile.A, rank: 2 }, to: { file: ChessFile.A, rank: 3 }, isAttacking: false },
            { from: { file: ChessFile.B, rank: 2 }, to: { file: ChessFile.B, rank: 3 }, isAttacking: false }
        ];
        const move = bot.makeMove(dummyBoard, moves, Player.WHITE);
        expect(moves).toContainEqual(move);
    });
});
