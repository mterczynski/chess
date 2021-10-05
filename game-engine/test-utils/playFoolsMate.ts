import { Game } from "../Game";
import { ChessFile } from "../positions";

export function playFoolsMate(): Game {
    const game = new Game();

    game.move({ from: { file: ChessFile.F, rank: 2 }, to: { file: ChessFile.F, rank: 3 } });
    game.move({ from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 6 } });

    game.move({ from: { file: ChessFile.G, rank: 2 }, to: { file: ChessFile.G, rank: 4 } });
    game.move({ from: { file: ChessFile.D, rank: 8 }, to: { file: ChessFile.H, rank: 4 } });

    return game;
}
