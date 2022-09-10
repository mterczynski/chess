import { Game } from "../../Game";
import { ChessFile } from "../../positions";
import {
    moveLeftWhiteKnightBackward,
    moveLeftWhiteKnightForward,
} from "./moveLeftWhiteKnight";

export function createGameWithMoveBeforeBlackPawnPromotion() {
    const game = new Game();
    moveLeftWhiteKnightForward(game);
    game.move({
        from: { file: ChessFile.H, rank: 7 },
        to: { file: ChessFile.H, rank: 5 },
    });
    moveLeftWhiteKnightBackward(game);
    game.move({
        from: { file: ChessFile.H, rank: 5 },
        to: { file: ChessFile.H, rank: 4 },
    });
    moveLeftWhiteKnightForward(game);
    game.move({
        from: { file: ChessFile.H, rank: 4 },
        to: { file: ChessFile.H, rank: 3 },
    });
    moveLeftWhiteKnightBackward(game);
    game.move({
        from: { file: ChessFile.H, rank: 3 },
        to: { file: ChessFile.G, rank: 2 },
    });
    moveLeftWhiteKnightForward(game);

    return game;
}
