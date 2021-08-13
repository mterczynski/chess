import { Game } from "./Game";
import { GameState } from "./GameState";
import { Player } from "./Player";

describe('Game', () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    })

    describe('getState', () => {
        it('returns GameState.UNSTARTED by default', () => {
            expect(game.getState()).toBe(GameState.UNSTARTED);
        });
    });

    describe('getCurrentPlayer', () => {
        it('returns Player.WHITE by default', () => {
            expect(game.getCurrentPlayer()).toBe(Player.WHITE);
        });

        it('returns Player.BLACK after making a move, then WHITE after making another move', () => {
            game.move({
                from: {
                    file: "E",
                    rank: 2,
                },
                to: {
                    file: "E",
                    rank: 4,
                },
            });
            expect(game.getCurrentPlayer()).toBe(Player.BLACK);
            game.move({
                from: {
                    file: "E",
                    rank: 7,
                },
                to: {
                    file: "E",
                    rank: 5,
                },
            });
            expect(game.getCurrentPlayer()).toBe(Player.WHITE);
        });
    });

    describe('move', () => {
        it('throws an error if invalid move was passed', () => {
            game.move({
                from: {
                    file: "A",
                    rank: 1,
                },
                to: {
                    file: "A",
                    rank: 2,
                },
            });

            expect(game.move).toThrow('Invalid move');
        });
    });
});
