/**
 * https://chess.stackexchange.com/a/28803
 * https://www.chess.com/forum/view/game-showcase/fastest-stalemate-known-in-chess
 *
 * Stalemate in 10 moves by Sam Loyd, one of the fastest known ways to stalemate
 *
*/

import { Game } from "../src/Game";
import { GameState } from "../src/GameState";
import { ChessFile } from "../src/positions";

describe('Ten move draw', () => {
    test('play all the moves, check that game ended in a draw', () => {
        const game = new Game();

        game.move({ from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 3 } });
        game.move({ from: { file: ChessFile.A, rank: 7 }, to: { file: ChessFile.A, rank: 5 } });

        game.move({ from: { file: ChessFile.D, rank: 1 }, to: { file: ChessFile.H, rank: 5 } });
        game.move({ from: { file: ChessFile.A, rank: 8 }, to: { file: ChessFile.A, rank: 6 } });

        game.move({ from: { file: ChessFile.H, rank: 5 }, to: { file: ChessFile.A, rank: 5 } });
        game.move({ from: { file: ChessFile.H, rank: 7 }, to: { file: ChessFile.H, rank: 5 } });

        game.move({ from: { file: ChessFile.H, rank: 2 }, to: { file: ChessFile.H, rank: 4 } });
        game.move({ from: { file: ChessFile.A, rank: 6 }, to: { file: ChessFile.H, rank: 6 } });

        game.move({ from: { file: ChessFile.A, rank: 5 }, to: { file: ChessFile.C, rank: 7 } });
        game.move({ from: { file: ChessFile.F, rank: 7 }, to: { file: ChessFile.F, rank: 6 } });

        game.move({ from: { file: ChessFile.C, rank: 7 }, to: { file: ChessFile.D, rank: 7 } });
        game.move({ from: { file: ChessFile.E, rank: 8 }, to: { file: ChessFile.F, rank: 7 } });

        game.move({ from: { file: ChessFile.D, rank: 7 }, to: { file: ChessFile.B, rank: 7 } });
        game.move({ from: { file: ChessFile.D, rank: 8 }, to: { file: ChessFile.D, rank: 3 } });

        game.move({ from: { file: ChessFile.B, rank: 7 }, to: { file: ChessFile.B, rank: 8 } });
        game.move({ from: { file: ChessFile.D, rank: 3 }, to: { file: ChessFile.H, rank: 7 } });

        game.move({ from: { file: ChessFile.B, rank: 8 }, to: { file: ChessFile.C, rank: 8 } });
        game.move({ from: { file: ChessFile.F, rank: 7 }, to: { file: ChessFile.G, rank: 6 } });

        game.move({ from: { file: ChessFile.C, rank: 8 }, to: { file: ChessFile.E, rank: 6 } });

        expect(game.getState()).toEqual(GameState.DRAW_BY_STALEMATE);
    });
});
