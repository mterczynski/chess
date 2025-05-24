import { RandomMoveBot } from "./RandomMoveBot";
import { Move } from "../Moves";
import { ChessFile } from "../positions/ChessFile";
import { getEmptyBoard } from "game-engine/test-utils/getEmptyBoard";

describe("RandomMoveBot", () => {
    const emptyBoard = getEmptyBoard()

    it("returns the only available move", () => {
        const bot = new RandomMoveBot();
        const moves: Move[] = [
            {
                from: { file: ChessFile.A, rank: 2 },
                to: { file: ChessFile.A, rank: 3 },
                isAttacking: false,
            },
        ];
        const move = bot.makeMove(emptyBoard, moves);
        expect(move).toEqual(moves[0]);
    });

    it("returns one of the available moves when two moves are present", () => {
        const bot = new RandomMoveBot();
        const moves: Move[] = [
            {
                from: { file: ChessFile.A, rank: 2 },
                to: { file: ChessFile.A, rank: 3 },
                isAttacking: false,
            },
            {
                from: { file: ChessFile.B, rank: 2 },
                to: { file: ChessFile.B, rank: 3 },
                isAttacking: false,
            },
        ];
        const move = bot.makeMove(emptyBoard, moves);
        expect(moves).toContainEqual(move);
    });

    it("throws an error if no available moves (empty array)", () => {
        const bot = new RandomMoveBot();
        expect(() => bot.makeMove(emptyBoard, [])).toThrow("No available moves");
    });
});
