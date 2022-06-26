import { Knight, PieceType } from "../pieces";
import { Player } from "../Player";
import { ChessFile, Position, Rank } from "../positions";
import { getEmptyBoard } from "../../test-utils/getEmptyBoard";
import { KnightMoveCalculator } from "./KnightMoveCalculator";

describe('KnightMoveCalculator', () => {
    let calculator: KnightMoveCalculator;

    beforeEach(() => {
        calculator = new KnightMoveCalculator();
    });

    describe('getAvailableMovesForPieceIgnoringKingSafety', () => {
        describe('returns all attacking and non attacking moves', () => {
            test('for white', () => {
                const board = getEmptyBoard();
                const knight: Knight & { position: Position } = {
                    player: Player.WHITE,
                    type: PieceType.KNIGHT,
                    position: {
                        file: ChessFile.B,
                        rank: 7 as Rank
                    }
                }

                board[ChessFile.D][8] = { player: Player.BLACK, type: PieceType.QUEEN };
                board[ChessFile.D][6] = { player: Player.WHITE, type: PieceType.ROOK, hasMoved: true };

                const result = calculator.getAvailableMovesForPieceIgnoringKingSafety(knight, board);

                expect(result).toEqual(expect.arrayContaining([
                    { from: knight.position, to: { file: ChessFile.A, rank: 5 } },
                    { from: knight.position, to: { file: ChessFile.C, rank: 5 } },
                    { from: knight.position, to: { file: ChessFile.D, rank: 8 } },
                ]));
                expect(result.length).toEqual(3);
            });

            test('for black', () => {
                const board = getEmptyBoard();
                const knight: Knight & { position: Position } = {
                    player: Player.BLACK,
                    type: PieceType.KNIGHT,
                    position: {
                        file: ChessFile.B,
                        rank: 7 as Rank
                    }
                }

                board[ChessFile.D][8] = { player: Player.WHITE, type: PieceType.QUEEN };
                board[ChessFile.D][6] = { player: Player.BLACK, type: PieceType.ROOK, hasMoved: true };

                const result = calculator.getAvailableMovesForPieceIgnoringKingSafety(knight, board);

                expect(result).toEqual(expect.arrayContaining([
                    { from: knight.position, to: { file: ChessFile.A, rank: 5 } },
                    { from: knight.position, to: { file: ChessFile.C, rank: 5 } },
                    { from: knight.position, to: { file: ChessFile.D, rank: 8 } },
                ]));
                expect(result.length).toEqual(3);
            });
        });
    })
})
