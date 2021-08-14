import { Game } from "..";
import { Move } from "../Move";
import { Bishop, Knight, PieceType } from "../pieces";
import { Player } from "../Player";
import { ChessFile, Position, Rank } from "../positions";
import { getEmptyBoard } from "../test-utils/getEmptyBoard";
import { BishopMoveCalculator } from "./BishopMoveCalculator";

describe('BishopMoveCalculator', () => {
    let calculator: BishopMoveCalculator;

    beforeEach(() => {
        calculator = new BishopMoveCalculator();
    });

    describe('getAvailableMovesForBishop', () => {
        describe('returns all attacking and non attacking moves', () => {
            test('for white', () => {
                const board = getEmptyBoard();
                const bishop: Bishop & {position: Position} = {
                    player: Player.WHITE,
                    type: PieceType.BISHOP,
                    position: {
                        file: ChessFile.D,
                        rank: 4 as Rank
                    }
                }

                // own piece, cannot be attacked
                board[ChessFile.B][6] = {player: Player.WHITE, type: PieceType.QUEEN};
                board[ChessFile.C][3] = {player: Player.BLACK, type: PieceType.QUEEN};
                board[ChessFile.F][2] = {player: Player.BLACK, type: PieceType.QUEEN};
                // queen hidden by F2 queen, cannot be attacked
                board[ChessFile.G][1] = {player: Player.BLACK, type: PieceType.QUEEN};

                const result = calculator.getAvailableMovesForBishop(bishop, board);

                const expectedMoves: Move[] = [
                    // top left diagonal
                    {from: bishop.position, to: {file: ChessFile.C, rank: 5}},
                    // top right diagonal
                    {from: bishop.position, to: {file: ChessFile.E, rank: 5}},
                    {from: bishop.position, to: {file: ChessFile.F, rank: 6}},
                    {from: bishop.position, to: {file: ChessFile.G, rank: 7}},
                    {from: bishop.position, to: {file: ChessFile.H, rank: 8}},
                    // bottom left diagonal
                    {from: bishop.position, to: {file: ChessFile.C, rank: 3}},
                    // bottom right diagonal
                    {from: bishop.position, to: {file: ChessFile.E, rank: 3}},
                    {from: bishop.position, to: {file: ChessFile.F, rank: 2}},
                ]

                expect(result).toEqual(expect.arrayContaining(expectedMoves));
                expect(result.length).toEqual(expectedMoves.length);
            });
        });
    })
})
