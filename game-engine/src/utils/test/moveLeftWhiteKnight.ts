import { Game } from "../../Game";
import { ChessFile } from "../../positions";

export const moveLeftWhiteKnightForward = (game: Game) => {
    game.move({
        from: { file: ChessFile.B, rank: 1 },
        to: { file: ChessFile.A, rank: 3 },
    });
};

export const moveLeftWhiteKnightBackward = (game: Game) => {
    game.move({
        from: { file: ChessFile.A, rank: 3 },
        to: { file: ChessFile.B, rank: 1 },
    });
};
