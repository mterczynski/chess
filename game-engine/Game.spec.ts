import { Game } from "./Game";
import { GameState } from "./GameState";
import { mapIndexToChessFile } from "./mapIndexToChessFile";
import { Move } from "./Move";
import { Player } from "./Player";
import { ChessFile } from "./positions";

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

        it('returns null after game is finished', () => {
            // todo
        });
    });

    describe('move', () => {
        it('throws an error if invalid move was passed', () => {
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

    // describe('getAvailableMovesForPiece', () => {
    //     it('should work for E pawn in new game', () => {
    //     });
    // })


    // describe('getAvailableMoves', () => {
    //     it('returns correct moves when called in new game', () => {
    //         const pawnMoves: Move[] = Array(Game.boardSize).fill(null).flatMap((_, index) => {
    //             const file = mapIndexToChessFile(index);
    //             return [
    //                 {from: {file: file, rank: 2}, to: {file: file, rank: 3}},
    //                 {from: {file: file, rank: 2}, to: {file: file, rank: 4}}
    //             ]
    //         });

    //         const knightMoves: Move[] = [
    //             {from: {file: ChessFile.B, rank: 1}, to: {file: ChessFile.A, rank: 3}},
    //             {from: {file: ChessFile.B, rank: 1}, to: {file: ChessFile.C, rank: 3}},
    //             {from: {file: ChessFile.G, rank: 1}, to: {file: ChessFile.F, rank: 3}},
    //             {from: {file: ChessFile.G, rank: 1}, to: {file: ChessFile.H, rank: 3}},
    //         ]

    //         const expectedMoves: Move[] = [
    //             ...pawnMoves,
    //             ...knightMoves,
    //         ];

    //         const result = game.getAvailableMovesForPlayer();

    //         expect(result).toEqual(expect.arrayContaining(expectedMoves));
    //         expect(result.length).toEqual(expectedMoves.length);
    //     });
    // });

});
