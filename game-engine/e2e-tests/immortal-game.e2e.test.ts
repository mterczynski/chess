/*
    Full E2E test that plays through the Immortal Game, one of the most famous chess games
    https://en.wikipedia.org/wiki/Immortal_Game
    https://www.chessgames.com/perl/chessgame?gid=1018910
*/

import { Game } from "..";
import { GameState } from "../GameState";
import { ChessFile } from "../positions";

describe('Immortal game', () => {
    test('play all the moves, check that white won', () => {
        const game = new Game();

        game.move({ from: { file: ChessFile.E, rank: 2 }, to: { file: ChessFile.E, rank: 4 } });
        game.move({ from: { file: ChessFile.E, rank: 7 }, to: { file: ChessFile.E, rank: 5 } });

        game.move({ from: { file: ChessFile.F, rank: 2 }, to: { file: ChessFile.F, rank: 4 } });
        game.move({ from: { file: ChessFile.E, rank: 5 }, to: { file: ChessFile.F, rank: 4 } });

        game.move({ from: { file: ChessFile.F, rank: 1 }, to: { file: ChessFile.C, rank: 4 } });
        game.move({ from: { file: ChessFile.D, rank: 8 }, to: { file: ChessFile.H, rank: 4 } });

        game.move({ from: { file: ChessFile.E, rank: 1 }, to: { file: ChessFile.F, rank: 1 } });
        game.move({ from: { file: ChessFile.B, rank: 7 }, to: { file: ChessFile.B, rank: 5 } })

        game.move({ from: { file: ChessFile.C, rank: 4 }, to: { file: ChessFile.B, rank: 5 } });
        game.move({ from: { file: ChessFile.G, rank: 8 }, to: { file: ChessFile.F, rank: 6 } });

        game.move({ from: { file: ChessFile.G, rank: 1 }, to: { file: ChessFile.F, rank: 3 } });
        game.move({ from: { file: ChessFile.H, rank: 4 }, to: { file: ChessFile.H, rank: 6 } });

        game.move({ from: { file: ChessFile.D, rank: 2 }, to: { file: ChessFile.D, rank: 3 } });
        game.move({ from: { file: ChessFile.F, rank: 6 }, to: { file: ChessFile.H, rank: 5 } });

        game.move({ from: { file: ChessFile.F, rank: 3 }, to: { file: ChessFile.H, rank: 4 } });
        game.move({ from: { file: ChessFile.H, rank: 6 }, to: { file: ChessFile.G, rank: 5 } });

        game.move({ from: { file: ChessFile.H, rank: 4 }, to: { file: ChessFile.F, rank: 5 } });
        game.move({ from: { file: ChessFile.C, rank: 7 }, to: { file: ChessFile.C, rank: 6 } });

        game.move({ from: { file: ChessFile.G, rank: 2 }, to: { file: ChessFile.G, rank: 4 } });
        game.move({ from: { file: ChessFile.H, rank: 5 }, to: { file: ChessFile.F, rank: 6 } });

        game.move({ from: { file: ChessFile.H, rank: 1 }, to: { file: ChessFile.G, rank: 1 } });
        game.move({ from: { file: ChessFile.C, rank: 6 }, to: { file: ChessFile.B, rank: 5 } });

        game.move({ from: { file: ChessFile.H, rank: 2 }, to: { file: ChessFile.H, rank: 4 } });
        game.move({ from: { file: ChessFile.G, rank: 5 }, to: { file: ChessFile.G, rank: 6 } });

        game.move({ from: { file: ChessFile.H, rank: 4 }, to: { file: ChessFile.H, rank: 5 } });
        game.move({ from: { file: ChessFile.G, rank: 6 }, to: { file: ChessFile.G, rank: 5 } });

        game.move({ from: { file: ChessFile.D, rank: 1 }, to: { file: ChessFile.F, rank: 3 } });
        game.move({ from: { file: ChessFile.F, rank: 6 }, to: { file: ChessFile.G, rank: 8 } });

        game.move({ from: { file: ChessFile.C, rank: 1 }, to: { file: ChessFile.F, rank: 4 } });
        game.move({ from: { file: ChessFile.G, rank: 5 }, to: { file: ChessFile.F, rank: 6 } });

        game.move({ from: { file: ChessFile.B, rank: 1 }, to: { file: ChessFile.C, rank: 3 } });
        game.move({ from: { file: ChessFile.F, rank: 8 }, to: { file: ChessFile.C, rank: 5 } });

        game.move({ from: { file: ChessFile.C, rank: 3 }, to: { file: ChessFile.D, rank: 5 } });
        game.move({ from: { file: ChessFile.F, rank: 6 }, to: { file: ChessFile.B, rank: 2 } });

        game.move({ from: { file: ChessFile.F, rank: 4 }, to: { file: ChessFile.D, rank: 6 } });
        game.move({ from: { file: ChessFile.C, rank: 5 }, to: { file: ChessFile.G, rank: 1 } });

        game.move({ from: { file: ChessFile.E, rank: 4 }, to: { file: ChessFile.E, rank: 5 } });
        game.move({ from: { file: ChessFile.B, rank: 2 }, to: { file: ChessFile.A, rank: 1 } });

        game.move({ from: { file: ChessFile.F, rank: 1 }, to: { file: ChessFile.E, rank: 2 } });
        game.move({ from: { file: ChessFile.B, rank: 8 }, to: { file: ChessFile.A, rank: 6 } });

        game.move({ from: { file: ChessFile.F, rank: 5 }, to: { file: ChessFile.G, rank: 7 } });
        game.move({ from: { file: ChessFile.E, rank: 8 }, to: { file: ChessFile.D, rank: 8 } });

        game.move({ from: { file: ChessFile.F, rank: 3 }, to: { file: ChessFile.F, rank: 6 } });
        game.move({ from: { file: ChessFile.G, rank: 8 }, to: { file: ChessFile.F, rank: 6 } });

        game.move({ from: { file: ChessFile.D, rank: 6 }, to: { file: ChessFile.E, rank: 7 } });

        expect(game.getState()).toEqual(GameState.WHITE_WON);
        expect(game.getCurrentPlayer()).toBe(null);
    });
});
