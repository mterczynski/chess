import { Move, SpecialMoveType } from "../Moves";
import { King, Pawn, PieceType, Rook } from "../pieces";
import { Player } from "../Player";
import { ChessFile, Position } from "../positions";
import { getEmptyBoard } from "../test-utils/getEmptyBoard";
import { KingMoveCalculator } from "./KingMoveCalculator";

describe('KingMoveCalculator', () => {
    let calculator: KingMoveCalculator;

    beforeEach(() => {
        calculator = new KingMoveCalculator();
    });

    describe('getAvailableMovesForPieceIgnoringKingSafety', () => {
        it('should return all moves that king can move to without considering whether he will be in check', () => {
            const board = getEmptyBoard();

            const king: King & { position: Position } = {
                hasMoved: true,
                player: Player.BLACK,
                type: PieceType.KING,
                position: {
                    file: ChessFile.A,
                    rank: 8,
                }
            }

            const blackPawn: Pawn = {
                player: Player.BLACK,
                type: PieceType.PAWN,
            }

            const whitePawn: Pawn = {
                player: Player.WHITE,
                type: PieceType.PAWN,
            }

            board[ChessFile.B][8] = blackPawn;
            board[ChessFile.A][7] = whitePawn;

            const expectedMoves: Move[] = [
                { from: king.position, to: { file: ChessFile.A, rank: 7 } },
                { from: king.position, to: { file: ChessFile.B, rank: 7 } },
            ];

            const result = calculator.getAvailableMovesForPieceIgnoringKingSafety(king, board);

            expect(result).toEqual(expect.arrayContaining(expectedMoves));
            expect(result.length).toEqual(expectedMoves.length);
        });
    });

    describe('should include castling moves', () => {
        test('for white', () => {
            const board = getEmptyBoard();

            const king: King & { position: Position } = {
                hasMoved: false,
                player: Player.WHITE,
                type: PieceType.KING,
                position: {
                    file: ChessFile.E,
                    rank: 1,
                }
            }

            const createRook = (): Rook => ({
                player: Player.WHITE,
                type: PieceType.ROOK,
                hasMoved: false
            });

            board[ChessFile.A][1] = createRook();
            board[ChessFile.H][7] = createRook();

            const expectedMoves: Move[] = [
                { from: king.position, to: { file: ChessFile.G, rank: 1 }, type: SpecialMoveType.CASTLE },
                { from: king.position, to: { file: ChessFile.C, rank: 1 }, type: SpecialMoveType.CASTLE },
                { from: king.position, to: { file: ChessFile.D, rank: 1 } },
                { from: king.position, to: { file: ChessFile.D, rank: 2 } },
                { from: king.position, to: { file: ChessFile.E, rank: 2 } },
                { from: king.position, to: { file: ChessFile.F, rank: 1 } },
                { from: king.position, to: { file: ChessFile.F, rank: 2 } },
            ];

            const result = calculator.getAvailableMovesForPieceIgnoringKingSafety(king, board);

            expect(result).toEqual(expect.arrayContaining(expectedMoves));
            expect(result.length).toEqual(expectedMoves.length);
        });
    });
})
