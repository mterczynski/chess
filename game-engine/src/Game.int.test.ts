import { Game } from "./Game";
import { GameState } from "./GameState";
import { mapIndexToChessFile } from "./utils";
import { Move } from "./Moves";
import { Player } from "./Player";
import { ChessFile } from "./positions";
import { playFoolsMate } from "../test-utils/playFoolsMate";

describe('Game', () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    })

    describe('getState', () => {
        it('returns GameState.UNSTARTED by default', () => {
            expect(game.getState()).toBe(GameState.UNSTARTED);
        });

        it('returns GameState.InProgress after making the first move', () => {
            game.move({ from: { file: ChessFile.A, rank: 2 }, to: { file: ChessFile.A, rank: 4 } });
            expect(game.getState()).toBe(GameState.IN_PROGRESS);
        });
    });

    describe('getCurrentPlayer', () => {
        it('returns Player.WHITE by default', () => {
            expect(game.getCurrentPlayer()).toBe(Player.WHITE);
        });

        it('returns Player.BLACK after making a move, then WHITE after making another move', () => {
            game.move({
                from: {
                    file: ChessFile.E,
                    rank: 2,
                },
                to: {
                    file: ChessFile.E,
                    rank: 4,
                },
            });
            expect(game.getCurrentPlayer()).toBe(Player.BLACK);
            game.move({
                from: {
                    file: ChessFile.E,
                    rank: 7,
                },
                to: {
                    file: ChessFile.E,
                    rank: 5,
                },
            });
            expect(game.getCurrentPlayer()).toBe(Player.WHITE);
        });
    });

    describe('move', () => {
        describe('throws an error if invalid move was passed', () => {
            test('invalid move - busy destination square', () => {
                expect(() => {
                    game.move({
                        from: {
                            file: ChessFile.A,
                            rank: 1,
                        },
                        to: {
                            file: ChessFile.A,
                            rank: 2,
                        },
                    })
                }).toThrow('Invalid move');
            });

            test('invalid move - empty origin square', () => {
                expect(() => {
                    game.move({
                        from: {
                            file: ChessFile.A,
                            rank: 3,
                        },
                        to: {
                            file: ChessFile.A,
                            rank: 4,
                        },
                    })
                }).toThrow('Invalid move');
            });
        });
    });

    describe('getBoard', () => {
        it('returns starting board when called on new game', () => {
            const board = game.getBoard();

            expect(board).toMatchSnapshot();
        });

        it('returns correct board after first move', () => {
            const board = game.getBoard();

            game.move({
                from: {
                    file: ChessFile.E,
                    rank: 2
                },
                to: {
                    file: ChessFile.E,
                    rank: 4
                },
            })

            expect(board).toMatchSnapshot();
        });
    });

    describe('getAvailableMoves', () => {
        it('returns correct moves when called in new game', () => {
            const pawnMoves: Move[] = Array(Game.boardSize).fill(null).flatMap((_, index) => {
                const file = mapIndexToChessFile(index);
                return [
                    { from: { file: file, rank: 2 }, to: { file: file, rank: 3 } },
                    { from: { file: file, rank: 2 }, to: { file: file, rank: 4 } }
                ]
            });

            const knightMoves: Move[] = [
                { from: { file: ChessFile.B, rank: 1 }, to: { file: ChessFile.A, rank: 3 } },
                { from: { file: ChessFile.B, rank: 1 }, to: { file: ChessFile.C, rank: 3 } },
                { from: { file: ChessFile.G, rank: 1 }, to: { file: ChessFile.F, rank: 3 } },
                { from: { file: ChessFile.G, rank: 1 }, to: { file: ChessFile.H, rank: 3 } },
            ]

            const expectedMoves: Move[] = [
                ...pawnMoves,
                ...knightMoves,
            ];

            const result = game.getAvailableMovesForPlayer();

            expect(result).toEqual(expect.arrayContaining(expectedMoves));
            expect(result.length).toEqual(expectedMoves.length);
        });
    });

    it('prevents from making move after game is finished', () => {
        const game = playFoolsMate();

        expect(() => {
            game.move({ from: { file: ChessFile.A, rank: 2 }, to: { file: ChessFile.A, rank: 3 } });
        }).toThrow('Game has already finished, no more moves can be made');
    });

    describe('it ends in a draw when none of the players can win due to insuffiecient pieces to cause a check mate', () => {
        test('king vs king', () => {
            throw 'todo';
        });

        test('king + bishop vs king', () => {
            throw 'todo';
        });

        test('king + knight vs king', () => {

        });

        describe('2 knights + king vs king', () => {
            test('2 knights + king vs king is a draw', () => {
                throw 'todo';
            });

            test('2 knights + king vs king + pawn is not a draw', () => {
                throw 'todo';
            });
        });

        test('king and bishop versus king and bishop with the bishops on the same color', () => {

        });
        // todo - add more scenarios
    });

    describe('it ends in a draw when the board position is repeated 3 times', () => {
        test('todo', () => {
            throw 'todo';
        })
    });

    describe('50 move rule', () => {
        it('enables players to end a game with a draw when no capture or pawn has been moved in 50 consecutive moves', () => {
            throw 'todo';
        });
    })

    describe('75 move rule', () => {
        it('causes game to end automatically with a draw when no capture or pawn has been moved in 75 consecutive moves', () => {
            throw 'todo';
        });
    });
});
