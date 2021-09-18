import {getEmptyBoard} from "../test-utils/getEmptyBoard";
import {ChessFile, Position} from "../positions";
import {PieceType, Rook} from "../pieces";
import {Player} from "../Player";
import {LineMoveCalculator} from "./LineMoveCalculator";
import {Move} from "../Move";

describe('LineMoveCalculator', () => {
    let calculator: LineMoveCalculator;

    beforeEach(() => {
        calculator = new LineMoveCalculator();
    });

    describe('getAvailableMovesOnLineIgnoringKingSafety', () => {
        it('should get available moves on line', () => {
            const board = getEmptyBoard();
            board[ChessFile.D][6] = {player: Player.WHITE, type: PieceType.QUEEN};
            board[ChessFile.G][4] = {player: Player.BLACK, type: PieceType.QUEEN};
            // extra piece to check if only first piece in line can be captured
            board[ChessFile.H][4] = {player: Player.BLACK, type: PieceType.QUEEN}

            const rook: Rook & {position: Position} = {
                player: Player.WHITE,
                type: PieceType.ROOK,
                position: {
                    file: ChessFile.D,
                    rank: 4,
                },
                hasMoved: true,
            }

            const expectedMoves: Move[] = [
                // left
                {from: rook.position, to: {file: ChessFile.C, rank: 4}},
                {from: rook.position, to: {file: ChessFile.B, rank: 4}},
                {from: rook.position, to: {file: ChessFile.A, rank: 4}},
                // right
                {from: rook.position, to: {file: ChessFile.E, rank: 4}},
                {from: rook.position, to: {file: ChessFile.F, rank: 4}},
                {from: rook.position, to: {file: ChessFile.G, rank: 4}},
                // top
                {from: rook.position, to: {file: ChessFile.D, rank: 5}},
                // bottom
                {from: rook.position, to: {file: ChessFile.D, rank: 3}},
                {from: rook.position, to: {file: ChessFile.D, rank: 2}},
                {from: rook.position, to: {file: ChessFile.D, rank: 1}},
            ];

            const result = calculator.getAvailableMovesOnLineIgnoringKingSafety(rook, board);
            expect(result).toEqual(expect.arrayContaining(expectedMoves));
            expect(result.length).toEqual(expectedMoves.length);
        });
    });
});
