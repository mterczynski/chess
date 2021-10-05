import { AvailableMoveCalculator } from ".";
import { Move, SpecialMoveType } from "../Moves";
import { createBishop, createKing, createKnight, createPawn, createQueen, createRook } from "../pieces/PieceFactory";
import { Player } from "../Player";
import { ChessFile, Position } from "../positions";
import { getEmptyBoard } from "../test-utils/getEmptyBoard";

describe('AvailableMoveCalculator int.', () => {
    const availableMoveCalculator = new AvailableMoveCalculator();

    describe('getAvailableMovesForPlayer', () => {
        it('returns available castling moves for king', () => {
            const board = getEmptyBoard();

            board.A[1] = createRook(Player.WHITE);
            board.E[1] = createKing(Player.WHITE);
            board.H[1] = createRook(Player.WHITE);
            board.D[8] = createQueen(Player.BLACK); // queen preventing long castle
            board.C[8] = createKing(Player.BLACK);

            const result = availableMoveCalculator.getAvailableMovesForPlayer(board, Player.WHITE, null);

            const leftRookPosition: Position = { file: ChessFile.A, rank: 1 };
            const kingPosition: Position = { file: ChessFile.E, rank: 1 };
            const rightRookPosition: Position = { file: ChessFile.H, rank: 1 };

            const expectedResult: Move[] = [
                // left rook moves
                {
                    from: leftRookPosition,
                    to: {
                        file: ChessFile.B,
                        rank: 1
                    },
                },
                {
                    from: leftRookPosition,
                    to: {
                        file: ChessFile.C,
                        rank: 1
                    }
                },
                {
                    from: leftRookPosition,
                    to: {
                        file: ChessFile.D,
                        rank: 1
                    }
                },
                {
                    from: leftRookPosition,
                    to: {
                        file: ChessFile.A,
                        rank: 2
                    }
                },
                {
                    from: leftRookPosition,
                    to: {
                        file: ChessFile.A,
                        rank: 3
                    }
                },
                {
                    from: leftRookPosition,
                    to: {
                        file: ChessFile.A,
                        rank: 4
                    }
                },
                {
                    from: leftRookPosition,
                    to: {
                        file: ChessFile.A,
                        rank: 5
                    }
                },
                {
                    from: leftRookPosition,
                    to: {
                        file: ChessFile.A,
                        rank: 6
                    }
                },
                {
                    from: leftRookPosition,
                    to: {
                        file: ChessFile.A,
                        rank: 7
                    }
                },
                {
                    from: leftRookPosition,
                    to: {
                        file: ChessFile.A,
                        rank: 8
                    }
                },
                // king moves
                {
                    from: kingPosition,
                    to: {
                        file: ChessFile.E,
                        rank: 2
                    }
                },
                {
                    from: kingPosition,
                    to: {
                        file: ChessFile.F,
                        rank: 1
                    }
                },
                {
                    from: kingPosition,
                    to: {
                        file: ChessFile.F,
                        rank: 2
                    }
                },
                {
                    from: kingPosition,
                    to: {
                        file: ChessFile.G,
                        rank: 1
                    },
                    type: SpecialMoveType.CASTLING,
                },

                // right rook moves
                {
                    from: rightRookPosition,
                    to: {
                        file: ChessFile.G,
                        rank: 1
                    }
                },
                {
                    from: rightRookPosition,
                    to: {
                        file: ChessFile.F,
                        rank: 1
                    }
                },
                {
                    from: rightRookPosition,
                    to: {
                        file: ChessFile.H,
                        rank: 2
                    }
                },
                {
                    from: rightRookPosition,
                    to: {
                        file: ChessFile.H,
                        rank: 3
                    }
                },
                {
                    from: rightRookPosition,
                    to: {
                        file: ChessFile.H,
                        rank: 4
                    }
                },
                {
                    from: rightRookPosition,
                    to: {
                        file: ChessFile.H,
                        rank: 5
                    }
                },
                {
                    from: rightRookPosition,
                    to: {
                        file: ChessFile.H,
                        rank: 6
                    }
                },
                {
                    from: rightRookPosition,
                    to: {
                        file: ChessFile.H,
                        rank: 7
                    }
                },
                {
                    from: rightRookPosition,
                    to: {
                        file: ChessFile.H,
                        rank: 8
                    }
                }
            ];

            expect(result).toEqual(expect.arrayContaining(expectedResult));
            expect(result.length).toEqual(expectedResult.length);
        });

        it('doesn\'t allow king to move into squares protected by enemy pieces', () => {
            const board = getEmptyBoard();
            board.A[8] = createKing(Player.BLACK);
            board.E[1] = createKing(Player.WHITE);
            board.A[2] = createQueen(Player.BLACK);
            board.G[3] = createKnight(Player.BLACK);

            const expectedAvailableMoves: Move[] = [
                {
                    from: {
                        file: ChessFile.E,
                        rank: 1
                    },
                    to: {
                        file: ChessFile.D,
                        rank: 1,
                    }
                }
            ]

            expect(availableMoveCalculator.getAvailableMovesForPlayer(board, Player.WHITE, null)).toEqual(expectedAvailableMoves);
        });

        it('doesn\'t allow to move a non-king piece if it would cause player\'s king to be in check', () => {
            const board = getEmptyBoard();
            board.A[8] = createKing(Player.BLACK);
            board.E[1] = createKing(Player.WHITE);
            board.D[2] = createPawn(Player.WHITE);
            board.A[5] = createBishop(Player.BLACK); // bishop blocking pawn moves

            const whiteKingPosition: Position = {
                file: ChessFile.E,
                rank: 1
            };

            const expectedAvailableMoves: Move[] = [
                {
                    from: whiteKingPosition,
                    to: { file: ChessFile.D, rank: 1 },
                },
                {
                    from: whiteKingPosition,
                    to: { file: ChessFile.E, rank: 2 },
                },
                {
                    from: whiteKingPosition,
                    to: { file: ChessFile.F, rank: 1 },
                },
                {
                    from: whiteKingPosition,
                    to: { file: ChessFile.F, rank: 2 },
                },
            ]

            expect(availableMoveCalculator.getAvailableMovesForPlayer(board, Player.WHITE, null)).toEqual(expectedAvailableMoves);
        });

        it(`doesn't allow the king to castle when he is in check`, () => {
            const board = getEmptyBoard();

            board.E[8] = createKing(Player.BLACK);
            board.A[8] = createRook(Player.BLACK);
            board.E[1] = createRook(Player.WHITE);

            const result = availableMoveCalculator.getAvailableMovesForPlayer(board, Player.BLACK, null);

            const expectedResult: Move[] = [
                {
                    from: {
                        file: ChessFile.E,
                        rank: 8,
                    },
                    to: {
                        file: ChessFile.D,
                        rank: 7,
                    },
                },
                {
                    from: {
                        file: ChessFile.E,
                        rank: 8,
                    },
                    to: {
                        file: ChessFile.D,
                        rank: 8,
                    },
                },
                {
                    from: {
                        file: ChessFile.E,
                        rank: 8,
                    },
                    to: {
                        file: ChessFile.F,
                        rank: 7,
                    },
                },
                {
                    from: {
                        file: ChessFile.E,
                        rank: 8,
                    },
                    to: {
                        file: ChessFile.F,
                        rank: 8,
                    },
                }
            ]


            expect(result).toEqual(expect.arrayContaining(expectedResult));
            expect(result.length).toEqual(expectedResult.length);
        });
    });
});
