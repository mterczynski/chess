import { Move } from "../Move";
import { PieceType, Queen, Rook } from "../pieces";
import { Player } from "../Player";
import { ChessFile, Position } from "../positions";
import { getEmptyBoard } from "../test-utils/getEmptyBoard";
import { QueenMoveCalculator } from "./QueenMoveCalculator";

describe('QueenMoveCalculator', () => {
    let calculator: QueenMoveCalculator;

    beforeEach(() => {
        calculator = new QueenMoveCalculator();
    });

    describe('getAvailableMovesForPieceIgnoringKingSafety', () => {
        it('should get available moves for queen', () => {
            const board = getEmptyBoard();
            board[ChessFile.D][6] = {player: Player.WHITE, type: PieceType.KNIGHT};
            board[ChessFile.G][4] = {player: Player.BLACK, type: PieceType.KNIGHT};
            // extra piece to check if only first piece in line can be captured
            board[ChessFile.H][4] = {player: Player.BLACK, type: PieceType.KNIGHT};
            board[ChessFile.B][6] = {player: Player.BLACK, type: PieceType.KNIGHT};
            board[ChessFile.A][7] = {player: Player.BLACK, type: PieceType.KNIGHT};
            board[ChessFile.C][3] = {player: Player.WHITE, type: PieceType.KNIGHT};

            const queen: Queen & {position: Position} = {
                player: Player.WHITE,
                type: PieceType.QUEEN,
                position: {
                    file: ChessFile.D,
                    rank: 4,
                },
            }

            const expectedMoves: Move[] = [
                // left
                {from: queen.position, to: {file: ChessFile.C, rank: 4}},
                {from: queen.position, to: {file: ChessFile.B, rank: 4}},
                {from: queen.position, to: {file: ChessFile.A, rank: 4}},
                // right
                {from: queen.position, to: {file: ChessFile.E, rank: 4}},
                {from: queen.position, to: {file: ChessFile.F, rank: 4}},
                {from: queen.position, to: {file: ChessFile.G, rank: 4}},
                // top
                {from: queen.position, to: {file: ChessFile.D, rank: 5}},
                // bottom
                {from: queen.position, to: {file: ChessFile.D, rank: 3}},
                {from: queen.position, to: {file: ChessFile.D, rank: 2}},
                {from: queen.position, to: {file: ChessFile.D, rank: 1}},
                // top-left
                {from: queen.position, to: {file: ChessFile.C, rank: 5}},
                {from: queen.position, to: {file: ChessFile.B, rank: 6}},
                // top-right
                {from: queen.position, to: {file: ChessFile.E, rank: 5}},
                {from: queen.position, to: {file: ChessFile.F, rank: 6}},
                {from: queen.position, to: {file: ChessFile.G, rank: 7}},
                {from: queen.position, to: {file: ChessFile.H, rank: 8}},
                // bottom-left
                {from: queen.position, to: {file: ChessFile.E, rank: 3}},
                {from: queen.position, to: {file: ChessFile.F, rank: 2}},
                {from: queen.position, to: {file: ChessFile.G, rank: 1}},
            ];

            const result = calculator.getAvailableMovesForPieceIgnoringKingSafety(queen, board);
            expect(result).toEqual(expect.arrayContaining(expectedMoves));
            expect(result.length).toEqual(expectedMoves.length);
        });
    });
})
