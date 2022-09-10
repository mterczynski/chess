import { Game } from "../../Game";
import { ChessFile } from "../../positions";

export function createGameWithMoveBeforeWhitePawnPromotion() {
    const game = new Game();
    game.move({
        from: { file: ChessFile.A, rank: 2 },
        to: { file: ChessFile.A, rank: 4 },
    });
    game.move({
        from: { file: ChessFile.B, rank: 7 },
        to: { file: ChessFile.B, rank: 5 },
    });
    game.move({
        from: { file: ChessFile.A, rank: 4 },
        to: { file: ChessFile.B, rank: 5 },
    });
    game.move({
        from: { file: ChessFile.G, rank: 8 },
        to: { file: ChessFile.H, rank: 6 },
    });
    game.move({
        from: { file: ChessFile.B, rank: 5 },
        to: { file: ChessFile.B, rank: 6 },
    });
    game.move({
        from: { file: ChessFile.H, rank: 6 },
        to: { file: ChessFile.G, rank: 8 },
    });
    game.move({
        from: { file: ChessFile.B, rank: 6 },
        to: { file: ChessFile.B, rank: 7 },
    });
    game.move({
        from: { file: ChessFile.G, rank: 8 },
        to: { file: ChessFile.H, rank: 6 },
    });
    return game;
}
