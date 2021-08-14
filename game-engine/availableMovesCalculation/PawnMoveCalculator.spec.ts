import { Game } from "..";
import { Board } from "../Board";
import { Move } from "../Move";
import { Pawn, PieceType } from "../pieces";
import { Player } from "../Player";
import { ChessFile, Position, Rank } from "../positions";
import { PawnMoveCalculator } from "./PawnMoveCalculator";

describe('PawnMoveCalculator', () => {
    let calculator: PawnMoveCalculator;

    beforeEach(() => {
        calculator = new PawnMoveCalculator();
    })

    describe('getAvailableMovesForPawn', () => {
        describe('returns single and double non-attacking moves up if available', () => {
            test('for black', () => {
                const board: Board = new Game().getBoard();
                const lastMove: Move = {
                    from: {file: ChessFile.H, rank: 2},
                    to: {file: ChessFile.H, rank: 3},
                };
                board[ChessFile.H][2] = null;
                board[ChessFile.H][3] = {player: Player.WHITE, type: PieceType.PAWN};
                const pawnPosition = {
                    file: ChessFile.E,
                    rank: 7 as Rank,
                };
                const pawn: Pawn & {position: Position} = {
                    player: Player.BLACK,
                    position: pawnPosition,
                    type: PieceType.PAWN,
                };
                const currentPlayer = Player.BLACK;
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

                const result = calculator.getAvailableMovesForPawn(pawn, board, currentPlayer, lastMove);

                expect(result).toEqual(expect.arrayContaining(expectedMoves));
                expect(result.length).toEqual(expectedMoves.length);
            });

            test('for white', () => {
                const board: Board = new Game().getBoard();
                const pawnPosition = {
                    file: ChessFile.E,
                    rank: 2 as Rank,
                };
                const pawn: Pawn & {position: Position} = {
                    player: Player.WHITE,
                    position: pawnPosition,
                    type: PieceType.PAWN,
                };
                const currentPlayer = Player.WHITE;
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

                const result = calculator.getAvailableMovesForPawn(pawn, board, currentPlayer, null);

                expect(result).toEqual(expect.arrayContaining(expectedMoves));
                expect(result.length).toEqual(expectedMoves.length);
            });
        });

        describe('includes possible attacking moves (no en passant scenarios)', () => {
            test('for black', () => {
                const board = new Game().getBoard();
                const pawnPosition = {
                    file: ChessFile.B,
                    rank: 7 as Rank,
                };
                const pawn: Pawn & {position: Position} = {
                    player: Player.BLACK,
                    position: pawnPosition,
                    type: PieceType.PAWN,
                };
                const currentPlayer = Player.BLACK;
                board[ChessFile.A][6] = {
                    player: Player.WHITE,
                    type: PieceType.KNIGHT,
                }
                board[ChessFile.C][6] = {
                    player: Player.WHITE,
                    type: PieceType.KNIGHT,
                };
                const lastMove: Move = {
                    from: {file: ChessFile.B, rank: 4},
                    to: {file: ChessFile.A, rank: 6},
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

                const result = calculator.getAvailableMovesForPawn(pawn, board, currentPlayer, lastMove);

                expect(result).toEqual(expect.arrayContaining(expectedAttackingMoves));
                expect(result.length).toEqual(4);
            });

            test('for white', () => {
                const board = new Game().getBoard();
                const pawnPosition = {
                    file: ChessFile.B,
                    rank: 2 as Rank,
                };
                const pawn: Pawn & {position: Position} = {
                    player: Player.WHITE,
                    position: pawnPosition,
                    type: PieceType.PAWN,
                };
                const currentPlayer = Player.WHITE;
                board[ChessFile.A][3] = {
                    player: Player.BLACK,
                    type: PieceType.KNIGHT,
                }
                board[ChessFile.C][3] = {
                    player: Player.BLACK,
                    type: PieceType.KNIGHT,
                }
                const lastMove: Move = {
                    from: {file: ChessFile.B, rank: 5},
                    to: {file: ChessFile.A, rank: 3},
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

                const result = calculator.getAvailableMovesForPawn(pawn, board, currentPlayer, lastMove);

                expect(result).toEqual(expect.arrayContaining(expectedAttackingMoves));
                expect(result.length).toEqual(4);
            });
        });

        describe('includes possible en passant moves', () => {
            test('for black', () => {
                const board = new Game().getBoard();
                const blackPawnPosition = {
                    file: ChessFile.B,
                    rank: 4 as Rank,
                };
                board[ChessFile.C][4] = {
                    player: Player.WHITE,
                    type: PieceType.PAWN,
                };
                // pawn next to the black pawn to check if only the last moved white pawn can be target of en passant
                board[ChessFile.A][4] = {
                    player: Player.WHITE,
                    type: PieceType.PAWN,
                };
                const blackPawn: Pawn & {position: Position} = {
                    player: Player.BLACK,
                    position: blackPawnPosition,
                    type: PieceType.PAWN,
                };
                const currentPlayer = Player.BLACK;
                const enPassantMove: Move = {
                    from: blackPawnPosition,
                    to: {
                        file: ChessFile.C,
                        rank: 3,
                    }
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
                const result = calculator.getAvailableMovesForPawn(blackPawn, board, currentPlayer, lastMove);

                expect(result).toEqual(expect.arrayContaining([enPassantMove]));
                expect(result.length).toEqual(2);
            });

            test('for white', () => {
                const board = new Game().getBoard();
                const whitePawnPosition = {
                    file: ChessFile.B,
                    rank: 5 as Rank,
                };
                board[ChessFile.C][5] = {
                    player: Player.BLACK,
                    type: PieceType.PAWN,
                };
                // pawn next to the black pawn to check if only the last moved white pawn can be target of en passant
                board[ChessFile.A][5] = {
                    player: Player.BLACK,
                    type: PieceType.PAWN,
                };
                const whitePawn: Pawn & {position: Position} = {
                    player: Player.WHITE,
                    position: whitePawnPosition,
                    type: PieceType.PAWN,
                };
                const currentPlayer = Player.WHITE;
                const enPassantMove: Move = {
                    from: whitePawnPosition,
                    to: {
                        file: ChessFile.C,
                        rank: 6,
                    }
                };
                const lastMove: Move = {
                    from: {
                        file: ChessFile.C,
                        rank: 7,
                    },
                    to: {
                        file: ChessFile.C,
                        rank: 5
                    }
                };
                const result = calculator.getAvailableMovesForPawn(whitePawn, board, currentPlayer, lastMove);

                expect(result).toEqual(expect.arrayContaining([enPassantMove]));
                expect(result.length).toEqual(2);
            });
        })
    });
});