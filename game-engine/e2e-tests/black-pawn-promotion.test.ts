import { Game } from "../src/Game";
import { MoveType } from "../src/Moves";
import { PieceType } from "../src/pieces";
import { Player } from "../src/Player";
import { ChessFile } from "../src/positions";
import {
    moveLeftWhiteKnightBackward,
    moveLeftWhiteKnightForward,
} from "../src/utils/test/moveLeftWhiteKnight";

describe("Black pawn promotion", () => {
    test("promote H pawn", () => {
        const game = new Game();

        moveLeftWhiteKnightForward(game);
        game.move({
            from: { file: ChessFile.H, rank: 7 },
            to: { file: ChessFile.H, rank: 6 },
        });

        moveLeftWhiteKnightBackward(game);
        game.move({
            from: { file: ChessFile.H, rank: 6 },
            to: { file: ChessFile.H, rank: 5 },
        });

        moveLeftWhiteKnightForward(game);
        game.move({
            from: { file: ChessFile.H, rank: 5 },
            to: { file: ChessFile.H, rank: 4 },
        });

        moveLeftWhiteKnightBackward(game);
        game.move({
            from: { file: ChessFile.H, rank: 4 },
            to: { file: ChessFile.H, rank: 3 },
        });

        moveLeftWhiteKnightForward(game);
        game.move({
            from: { file: ChessFile.H, rank: 3 },
            to: { file: ChessFile.G, rank: 2 },
        });

        moveLeftWhiteKnightBackward(game);

        var moves = game.getAvailableMovesForPlayer();

        game.move({
            from: { file: ChessFile.G, rank: 2 },
            to: {
                file: ChessFile.H,
                rank: 1,
            },
            type: MoveType.PROMOTION,
            promoteTo: PieceType.QUEEN,
        });

        expect(game.getBoard()[ChessFile.H][1]?.type).toBe(PieceType.QUEEN);
        expect(game.getBoard()[ChessFile.H][1]?.player).toBe(Player.BLACK);
    });
});
