import { Board } from "../Board";
import { createNewBoard } from "../createNewBoard";
import { EnPassantMove, Move, SpecialMoveType } from "../Moves";
import { Pawn, PieceType } from "../pieces";
import { createKnight, createPawn } from "../pieces/PieceFactory";
import { Player } from "../Player";
import { ChessFile, Position, Rank } from "../positions";
import { getEmptyBoard } from "../../test-utils/getEmptyBoard";
import { PawnMoveCalculator } from "./PawnMoveCalculator";

describe('PawnMoveCalculator', () => {
    let calculator: PawnMoveCalculator;

    beforeEach(() => {
        calculator = new PawnMoveCalculator();
    });

    describe('getAvailableMovesForPieceIgnoringKingSafety', () => {
        describe('returns single and double non-attacking moves up if available', () => {
            test('for black', () => {
                const board: Board = createNewBoard();
                const lastMove: Move = {
                    from: { file: ChessFile.H, rank: 2 },
                    to: { file: ChessFile.H, rank: 3 },
                };
                board[ChessFile.H][2] = null;
                board[ChessFile.H][3] = createPawn(Player.WHITE);
                const pawnPosition = {
                    file: ChessFile.E,
                    rank: 7 as Rank,
                };
                const pawn: Pawn & { position: Position } = {
                    ...createPawn(Player.BLACK),
                    position: pawnPosition,
                };
                const expectedMoves: Move[] = [
                    {
                        from: pawnPosition,
                        to: {
                            file: ChessFile.E,
                            rank: 6,
                        }
                    },
                    {
                        from: pawnPosition,
                        to: {
                            file: ChessFile.E,
                            rank: 5,
                        }
                    }
                ];

                const result = calculator.getAvailableMovesForPieceIgnoringKingSafety(pawn, board, lastMove);

                expect(result).toEqual(expect.arrayContaining(expectedMoves));
                expect(result.length).toEqual(expectedMoves.length);
            });

            test('for white', () => {
                const board: Board = createNewBoard();
                const pawnPosition = {
                    file: ChessFile.E,
                    rank: 2 as Rank,
                };
                const pawn: Pawn & { position: Position } = {
                    ...createPawn(Player.WHITE),
                    position: pawnPosition,
                };
                const expectedMoves: Move[] = [
                    {
                        from: pawnPosition,
                        to: {
                            file: ChessFile.E,
                            rank: 3,
                        }
                    },
                    {
                        from: pawnPosition,
                        to: {
                            file: ChessFile.E,
                            rank: 4,
                        }
                    }
                ];

                const result = calculator.getAvailableMovesForPieceIgnoringKingSafety(pawn, board, null);

                expect(result).toEqual(expect.arrayContaining(expectedMoves));
                expect(result.length).toEqual(expectedMoves.length);
            });
        });

        describe('includes possible attacking moves (no en passant scenarios)', () => {
            test('for black', () => {
                const board = createNewBoard();
                const pawnPosition = {
                    file: ChessFile.B,
                    rank: 7 as Rank,
                };
                const pawn: Pawn & { position: Position } = {
                    ...createPawn(Player.BLACK),
                    position: pawnPosition,
                };
                board[ChessFile.A][6] = createKnight(Player.WHITE);
                board[ChessFile.C][6] = createKnight(Player.WHITE);
                const lastMove: Move = {
                    from: { file: ChessFile.B, rank: 4 },
                    to: { file: ChessFile.A, rank: 6 },
                }
                const expectedAttackingMoves: Move[] = [
                    {
                        from: pawnPosition,
                        to: {
                            file: ChessFile.A,
                            rank: 6,
                        }
                    },
                    {
                        from: pawnPosition,
                        to: {
                            file: ChessFile.C,
                            rank: 6,
                        }
                    }
                ];

                const result = calculator.getAvailableMovesForPieceIgnoringKingSafety(pawn, board, lastMove);

                expect(result).toEqual(expect.arrayContaining(expectedAttackingMoves));
                expect(result.length).toEqual(4);
            });

            test('for white', () => {
                const board = createNewBoard();
                const pawnPosition = {
                    file: ChessFile.B,
                    rank: 2 as Rank,
                };
                const pawn: Pawn & { position: Position } = {
                    ...createPawn(Player.WHITE),
                    position: pawnPosition,
                };
                board[ChessFile.A][3] = createKnight(Player.BLACK);
                board[ChessFile.C][3] = createKnight(Player.BLACK);
                const lastMove: Move = {
                    from: { file: ChessFile.B, rank: 5 },
                    to: { file: ChessFile.A, rank: 3 },
                }
                const expectedAttackingMoves: Move[] = [
                    {
                        from: pawnPosition,
                        to: {
                            file: ChessFile.A,
                            rank: 3,
                        }
                    },
                    {
                        from: pawnPosition,
                        to: {
                            file: ChessFile.C,
                            rank: 3,
                        }
                    }
                ];

                const result = calculator.getAvailableMovesForPieceIgnoringKingSafety(pawn, board, lastMove);

                expect(result).toEqual(expect.arrayContaining(expectedAttackingMoves));
                expect(result.length).toEqual(4);
            });
        });

        describe('includes possible en passant moves', () => {
            test('for black', () => {
                const board = createNewBoard();
                const blackPawnPosition = {
                    file: ChessFile.B,
                    rank: 4 as Rank,
                };
                board[ChessFile.C][4] = createPawn(Player.WHITE);
                // pawn next to the black pawn to check if only the last moved white pawn can be target of en passant
                board[ChessFile.A][4] = createPawn(Player.WHITE);
                const blackPawn: Pawn & { position: Position } = {
                    ...createPawn(Player.BLACK),
                    position: blackPawnPosition,
                };
                const enPassantMove: EnPassantMove = {
                    from: blackPawnPosition,
                    to: {
                        file: ChessFile.C,
                        rank: 3,
                    },
                    type: SpecialMoveType.EN_PASSANT,
                };
                const lastMove: Move = {
                    from: {
                        file: ChessFile.C,
                        rank: 2,
                    },
                    to: {
                        file: ChessFile.C,
                        rank: 4
                    }
                };
                const result = calculator.getAvailableMovesForPieceIgnoringKingSafety(blackPawn, board, lastMove);

                expect(result).toEqual(expect.arrayContaining([enPassantMove]));
                expect(result.length).toEqual(2);
            });

            test('for white', () => {
                const board = createNewBoard();
                const whitePawnPosition = {
                    file: ChessFile.B,
                    rank: 5 as Rank,
                };
                // pawn next to the black pawn to check if only the last moved white pawn can be target of en passant
                board[ChessFile.C][5] = createPawn(Player.BLACK);
                board[ChessFile.A][5] = createPawn(Player.BLACK);
                const whitePawn: Pawn & { position: Position } = {
                    ...createPawn(Player.WHITE),
                    position: whitePawnPosition,
                };
                const enPassantMove: EnPassantMove = {
                    from: whitePawnPosition,
                    to: {
                        file: ChessFile.A,
                        rank: 6,
                    },
                    type: SpecialMoveType.EN_PASSANT,
                };
                const lastMove: Move = {
                    from: {
                        file: ChessFile.A,
                        rank: 7,
                    },
                    to: {
                        file: ChessFile.A,
                        rank: 5
                    }
                };
                const result = calculator.getAvailableMovesForPieceIgnoringKingSafety(whitePawn, board, lastMove);

                expect(result).toEqual(expect.arrayContaining([enPassantMove]));
                expect(result.length).toEqual(2);
            });
        });

        describe('includes possible promotion moves', () => {
            test('for black', () => {
                const board = getEmptyBoard();
                board.A[2] = createPawn(Player.BLACK);

                const promotionMoveBase = {
                    from: {
                        file: ChessFile.A,
                        rank: 2,
                    }, to: {
                        file: ChessFile.A,
                        rank: 1,
                    },
                    type: SpecialMoveType.PROMOTION,
                }

                const pawn: Pawn & { position: Position } = {
                    ...createPawn(Player.BLACK),
                    position: {
                        file: ChessFile.A,
                        rank: 2,
                    },
                }

                const expectedMoves: Move[] = [
                    {
                        ...(promotionMoveBase as any),
                        promoteTo: PieceType.KNIGHT
                    },
                    {
                        ...(promotionMoveBase as any),
                        promoteTo: PieceType.BISHOP
                    },
                    {
                        ...(promotionMoveBase as any),
                        promoteTo: PieceType.ROOK
                    },
                    {
                        ...(promotionMoveBase as any),
                        promoteTo: PieceType.QUEEN
                    },
                ];

                const result = calculator.getAvailableMovesForPieceIgnoringKingSafety(pawn, board, null);

                expect(result).toEqual(expect.arrayContaining(expectedMoves));
                expect(result.length).toEqual(expectedMoves.length);
            });

            test('for white', () => {
                const board = getEmptyBoard();
                board.A[7] = createPawn(Player.WHITE);

                const promotionMoveBase = {
                    from: {
                        file: ChessFile.A,
                        rank: 7,
                    }, to: {
                        file: ChessFile.A,
                        rank: 8,
                    },
                    type: SpecialMoveType.PROMOTION,
                }

                const pawn: Pawn & { position: Position } = {
                    ...createPawn(Player.WHITE),
                    position: {
                        file: ChessFile.A,
                        rank: 7,
                    },
                }

                const expectedMoves: Move[] = [
                    {
                        ...(promotionMoveBase as any),
                        promoteTo: PieceType.KNIGHT
                    },
                    {
                        ...(promotionMoveBase as any),
                        promoteTo: PieceType.BISHOP
                    },
                    {
                        ...(promotionMoveBase as any),
                        promoteTo: PieceType.ROOK
                    },
                    {
                        ...(promotionMoveBase as any),
                        promoteTo: PieceType.QUEEN
                    },
                ];

                const result = calculator.getAvailableMovesForPieceIgnoringKingSafety(pawn, board, null);

                expect(result).toEqual(expect.arrayContaining(expectedMoves));
                expect(result.length).toEqual(expectedMoves.length);
            });
        });

    });
});
