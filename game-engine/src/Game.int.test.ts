import { Game } from "./Game";
import { GameState } from "./GameState";
import { mapIndexToChessFile } from "./utils";
import { Move, MoveType } from "./Moves";
import { Player } from "./Player";
import { ChessFile } from "./positions";
import { playFoolsMate } from "../test-utils/playFoolsMate";
import { PieceType } from "./pieces";
import { createGameWithMoveBeforeWhitePawnPromotion } from "./utils/test/createGameWithMoveBeforeWhitePawnPromotion";
import {
    moveLeftWhiteKnightBackward,
    moveLeftWhiteKnightForward,
} from "./utils/test/moveLeftWhiteKnight";

const makeAnyMove = (game: Game) => {
    game.move(game.getAvailableMovesForPlayer()[0]);
};

describe("Game", () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    });

    describe("getState", () => {
        it("returns GameState.UNSTARTED by default", () => {
            expect(game.getState()).toBe(GameState.UNSTARTED);
        });

        it("returns GameState.InProgress after making the first move", () => {
            game.move({
                from: { file: ChessFile.A, rank: 2 },
                to: { file: ChessFile.A, rank: 4 },
            });
            expect(game.getState()).toBe(GameState.IN_PROGRESS);
        });
    });

    describe("clone (should deep clone the game without modyfing the original existing game)", () => {
        it("can be used to clone unstarted game", () => {
            const originalGame = new Game();
            const clone = originalGame.clone();

            expect(originalGame).toEqual(clone);
            expect(originalGame === clone).toBe(false);

            originalGame.move({
                from: { file: ChessFile.E, rank: 2 },
                to: { file: ChessFile.E, rank: 4 },
            });

            expect(originalGame.getCurrentPlayer()).toEqual(Player.BLACK);
            expect(clone.getCurrentPlayer()).toEqual(Player.WHITE);
        });

        it("can be used to clone an ongoing game", () => {
            const originalGame = new Game();

            originalGame.move({
                from: { file: ChessFile.E, rank: 2 },
                to: { file: ChessFile.E, rank: 4 },
            });

            const clone = originalGame.clone();

            expect(clone.getCurrentPlayer()).toEqual(Player.BLACK);
            expect(clone.getBoard()[ChessFile.E][2]).toBe(null);
            expect(clone.getBoard()[ChessFile.E][4]).toBeTruthy();
        });
    });

    describe("getCurrentPlayer", () => {
        it("returns Player.WHITE by default", () => {
            expect(game.getCurrentPlayer()).toBe(Player.WHITE);
        });

        it("returns Player.BLACK after making a move, then WHITE after making another move", () => {
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

    describe("move", () => {
        describe("throws an error if invalid move was passed", () => {
            test("invalid move - busy destination square", () => {
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
                    });
                }).toThrow("Invalid move");
            });

            test("invalid move - empty origin square", () => {
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
                    });
                }).toThrow("Invalid move");
            });
        });

        describe("promotion validation", () => {
            it('throws an error if promotion move is passed without type="PROMOTION"', () => {
                const game = createGameWithMoveBeforeWhitePawnPromotion();

                expect(() => {
                    game.move({
                        from: { file: ChessFile.B, rank: 7 },
                        to: { file: ChessFile.A, rank: 8 },
                    });
                }).toThrow(
                    `Invalid move type (expected=${MoveType.PROMOTION})`
                );
            });

            it("throws an error if promotion move is passed without `promoteTo`", () => {
                const game = createGameWithMoveBeforeWhitePawnPromotion();

                expect(() => {
                    game.move({
                        from: { file: ChessFile.B, rank: 7 },
                        to: { file: ChessFile.A, rank: 8 },
                        type: MoveType.PROMOTION,
                    });
                }).toThrow("Invalid move: (missing 'promoteTo')");
            });
        });

        describe("promotion", () => {
            it("works for white", () => {
                const game = createGameWithMoveBeforeWhitePawnPromotion();

                game.move({
                    from: { file: ChessFile.B, rank: 7 },
                    to: { file: ChessFile.A, rank: 8 },
                    type: MoveType.PROMOTION,
                    promoteTo: PieceType.KNIGHT,
                });

                expect(game.getBoard()[ChessFile.A][8]).toEqual({
                    type: PieceType.KNIGHT,
                    player: Player.WHITE,
                });
            });

            it("works for black", () => {
                const game = createGameWithMoveBeforeWhitePawnPromotion();

                game.move({
                    from: { file: ChessFile.B, rank: 7 },
                    to: { file: ChessFile.A, rank: 8 },
                    type: MoveType.PROMOTION,
                    promoteTo: PieceType.QUEEN,
                });

                expect(game.getBoard()[ChessFile.A][8]).toEqual({
                    type: PieceType.QUEEN,
                    player: Player.WHITE,
                });
            });
        });
    });

    describe("getBoard", () => {
        it("returns starting board when called on new game", () => {
            const board = game.getBoard();

            expect(board).toMatchSnapshot();
        });

        it("returns correct board after first move", () => {
            const board = game.getBoard();

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

            expect(board).toMatchSnapshot();
        });
    });

    describe("getAvailableMoves", () => {
        it("returns correct moves when called in new game", () => {
            const pawnMoves: Move[] = Array(Game.boardSize)
                .fill(null)
                .flatMap((_, index) => {
                    const file = mapIndexToChessFile(index);
                    return [
                        {
                            from: { file: file, rank: 2 },
                            to: { file: file, rank: 3 },
                        },
                        {
                            from: { file: file, rank: 2 },
                            to: { file: file, rank: 4 },
                        },
                    ];
                });

            const knightMoves: Move[] = [
                {
                    from: { file: ChessFile.B, rank: 1 },
                    to: { file: ChessFile.A, rank: 3 },
                },
                {
                    from: { file: ChessFile.B, rank: 1 },
                    to: { file: ChessFile.C, rank: 3 },
                },
                {
                    from: { file: ChessFile.G, rank: 1 },
                    to: { file: ChessFile.F, rank: 3 },
                },
                {
                    from: { file: ChessFile.G, rank: 1 },
                    to: { file: ChessFile.H, rank: 3 },
                },
            ];

            const expectedMoves: Move[] = [...pawnMoves, ...knightMoves];

            const result = game.getAvailableMovesForPlayer();

            expect(result).toEqual(expect.arrayContaining(expectedMoves));
            expect(result.length).toEqual(expectedMoves.length);
        });
    });

    describe("castling", () => {
        test("short castling (white side)", () => {
            const game = new Game();

            game.move({
                from: { file: ChessFile.G, rank: 1 },
                to: { file: ChessFile.H, rank: 3 },
            });
            makeAnyMove(game);
            game.move({
                from: { file: ChessFile.G, rank: 2 },
                to: { file: ChessFile.G, rank: 3 },
            });
            makeAnyMove(game);
            game.move({
                from: { file: ChessFile.F, rank: 1 },
                to: { file: ChessFile.G, rank: 2 },
            });
            makeAnyMove(game);
            game.move({
                from: { file: ChessFile.E, rank: 1 },
                to: { file: ChessFile.G, rank: 1 },
            });

            expect(game.getBoard()[ChessFile.F][1]?.type).toEqual(
                PieceType.ROOK
            );
            expect(game.getBoard()[ChessFile.G][1]?.type).toEqual(
                PieceType.KING
            );
            expect(game.getBoard()[ChessFile.H][1]).toBe(null);
        });

        test("long castling (white side)", () => {
            const moveBlackKnightForward = () => {
                game.move({
                    from: { file: ChessFile.G, rank: 8 },
                    to: { file: ChessFile.H, rank: 6 },
                });
            };
            const moveBlackKnightBackward = () => {
                game.move({
                    from: { file: ChessFile.H, rank: 6 },
                    to: { file: ChessFile.G, rank: 8 },
                });
            };
            const game = new Game();

            game.move({
                from: { file: ChessFile.D, rank: 2 },
                to: { file: ChessFile.D, rank: 4 },
            });
            moveBlackKnightForward();
            game.move({
                from: { file: ChessFile.B, rank: 1 },
                to: { file: ChessFile.C, rank: 3 },
            });
            moveBlackKnightBackward();
            game.move({
                from: { file: ChessFile.C, rank: 1 },
                to: { file: ChessFile.E, rank: 3 },
            });
            moveBlackKnightForward();
            game.move({
                from: { file: ChessFile.D, rank: 1 },
                to: { file: ChessFile.D, rank: 3 },
            });
            moveBlackKnightBackward();
            game.move({
                from: { file: ChessFile.E, rank: 1 },
                to: { file: ChessFile.C, rank: 1 },
            });

            expect(game.getBoard()[ChessFile.A][1]).toBe(null);
            expect(game.getBoard()[ChessFile.C][1]?.type).toEqual(
                PieceType.KING
            );
            expect(game.getBoard()[ChessFile.D][1]?.type).toEqual(
                PieceType.ROOK
            );
        });

        test("short castling (black side)", () => {
            const game = new Game();

            makeAnyMove(game);
            game.move({
                from: { file: ChessFile.G, rank: 8 },
                to: { file: ChessFile.H, rank: 6 },
            });
            makeAnyMove(game);
            game.move({
                from: { file: ChessFile.G, rank: 7 },
                to: { file: ChessFile.G, rank: 6 },
            });
            makeAnyMove(game);
            game.move({
                from: { file: ChessFile.F, rank: 8 },
                to: { file: ChessFile.G, rank: 7 },
            });
            makeAnyMove(game);
            game.move({
                from: { file: ChessFile.E, rank: 8 },
                to: { file: ChessFile.G, rank: 8 },
            });

            expect(game.getBoard()[ChessFile.F][8]?.type).toEqual(
                PieceType.ROOK
            );
            expect(game.getBoard()[ChessFile.G][8]?.type).toEqual(
                PieceType.KING
            );
            expect(game.getBoard()[ChessFile.H][8]).toBe(null);
        });

        test("long castling (black side)", () => {
            const game = new Game();

            moveLeftWhiteKnightForward(game);
            game.move({
                from: { file: ChessFile.D, rank: 7 },
                to: { file: ChessFile.D, rank: 6 },
            });
            moveLeftWhiteKnightBackward(game);
            game.move({
                from: { file: ChessFile.C, rank: 8 },
                to: { file: ChessFile.E, rank: 6 },
            });
            moveLeftWhiteKnightForward(game);
            game.move({
                from: { file: ChessFile.D, rank: 8 },
                to: { file: ChessFile.D, rank: 7 },
            });
            moveLeftWhiteKnightBackward(game);
            game.move({
                from: { file: ChessFile.B, rank: 8 },
                to: { file: ChessFile.A, rank: 6 },
            });
            moveLeftWhiteKnightForward(game);
            game.move({
                from: { file: ChessFile.E, rank: 8 },
                to: { file: ChessFile.C, rank: 8 },
            });

            expect(game.getBoard()[ChessFile.A][8]).toBe(null);
            expect(game.getBoard()[ChessFile.C][8]?.type).toEqual(
                PieceType.KING
            );
            expect(game.getBoard()[ChessFile.D][8]?.type).toEqual(
                PieceType.ROOK
            );
        });
    });

    describe("en passant", () => {
        it("works on white side", () => {
            const game = new Game();
            game.move({
                from: { file: ChessFile.E, rank: 2 },
                to: { file: ChessFile.E, rank: 4 },
            });
            game.move({
                from: { file: ChessFile.G, rank: 8 },
                to: { file: ChessFile.H, rank: 6 },
            });
            game.move({
                from: { file: ChessFile.E, rank: 4 },
                to: { file: ChessFile.E, rank: 5 },
            });
            game.move({
                from: { file: ChessFile.D, rank: 7 },
                to: { file: ChessFile.D, rank: 5 },
            });
            game.move({
                from: { file: ChessFile.E, rank: 5 },
                to: { file: ChessFile.D, rank: 6 },
            });

            expect(game.getBoard()[ChessFile.D][5]).toBe(null);
            expect(game.getBoard()[ChessFile.D][6]?.player).toBe(Player.WHITE);
            expect(game.getBoard()[ChessFile.D][6]?.type).toBe(PieceType.PAWN);
        });

        it("works on black side", () => {
            // TODO
        });
    });

    // TODO - uncomment tests

    it("prevents from making move after game is finished", () => {
        const game = playFoolsMate();

        expect(() => {
            game.move({
                from: { file: ChessFile.A, rank: 2 },
                to: { file: ChessFile.A, rank: 3 },
            });
        }).toThrow("Game has already finished, no more moves can be made");
    });

    // describe("it ends in a draw when none of the players can win due to insuffiecient pieces to cause a check mate", () => {
    //     test("king vs king", () => {
    //         throw "todo";
    //     });

    //     test("king + bishop vs king", () => {
    //         throw "todo";
    //     });

    //     test("king + knight vs king", () => {});

    //     describe("2 knights + king vs king", () => {
    //         test("2 knights + king vs king is a draw", () => {
    //             throw "todo";
    //         });

    //         test("2 knights + king vs king + pawn is not a draw", () => {
    //             throw "todo";
    //         });
    //     });

    //     test("king and bishop versus king and bishop with the bishops on the same color", () => {});
    //     // todo - add more scenarios
    // });

    // describe("it ends in a draw when the board position is repeated 3 times", () => {
    //     test("todo", () => {
    //         throw "todo";
    //     });
    // });

    // describe("50 move rule", () => {
    //     it("enables players to end a game with a draw when no capture or pawn has been moved in 50 consecutive moves", () => {
    //         throw "todo";
    //     });
    // });

    // describe("75 move rule", () => {
    //     it("causes game to end automatically with a draw when no capture or pawn has been moved in 75 consecutive moves", () => {
    //         const game = new Game();

    //         for (let i = 0; i < 74 / 2; i++) {
    //             game.move({
    //                 from: { file: ChessFile.B, rank: 1 },
    //                 to: { file: ChessFile.A, rank: 3 },
    //             });
    //             game.move({
    //                 from: { file: ChessFile.B, rank: 8 },
    //                 to: { file: ChessFile.A, rank: 6 },
    //             });

    //             game.move({
    //                 from: { file: ChessFile.A, rank: 3 },
    //                 to: { file: ChessFile.B, rank: 1 },
    //             });
    //             game.move({
    //                 from: { file: ChessFile.A, rank: 6 },
    //                 to: { file: ChessFile.B, rank: 8 },
    //             });
    //         }

    //         expect(game.getState()).toEqual(GameState.IN_PROGRESS);
    //         game.move({
    //             from: { file: ChessFile.B, rank: 1 },
    //             to: { file: ChessFile.A, rank: 3 },
    //         });
    //         expect(game.getState()).toEqual(GameState.DRAW_BY_75_MOVE_RULE);
    //     });
    // });
});
