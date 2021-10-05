import { PieceType, PieceWithPosition } from "../pieces";
import { createBishop, createKing, createKnight, createPawn, createQueen, createRook } from "../pieces/PieceFactory";
import { Player } from "../Player";
import { ChessFile } from "../positions";
import { getEmptyBoard } from "../test-utils/getEmptyBoard";
import { CheckCalculator } from "./CheckCalculator";

describe('CheckCalculator', () => {
    it('should returns enemy pieces (together with their positions) that cause checks on provided board', () => {
        throw new Error('todo');
    });

    // it('returns figures from both teams that create checks', () => {
    //     const board = getEmptyBoard();

    //     board.A[8] = createKing(Player.BLACK, true);
    //     board.G[2] = createKing(Player.WHITE, true);
    //     // pieces checking white king
    //     board.H[3] = createPawn(Player.BLACK);
    //     board.E[3] = createKnight(Player.BLACK);
    //     board.D[5] = createBishop(Player.BLACK);
    //     board.G[7] = createRook(Player.BLACK, true);
    //     board.B[2] = createQueen(Player.BLACK);
    //     // black pieces not checking white king
    //     board.B[8] = createPawn(Player.BLACK);
    //     board.C[8] = createKnight(Player.BLACK);
    //     board.D[8] = createBishop(Player.BLACK);
    //     board.E[8] = createRook(Player.BLACK, true);
    //     board.F[8] = createQueen(Player.BLACK);

    //     const result = new CheckCalculator().getCheckingEnemyPieces(board);
    //     const expectedResult: PieceWithPosition[] = [
    //         { player: Player.BLACK, type: PieceType.PAWN, position: { file: ChessFile.H, rank: 3 } },
    //         { player: Player.BLACK, type: PieceType.KNIGHT, position: { file: ChessFile.E, rank: 3 } },
    //         { player: Player.BLACK, type: PieceType.BISHOP, position: { file: ChessFile.D, rank: 5 } },
    //         { player: Player.BLACK, type: PieceType.ROOK, position: { file: ChessFile.G, rank: 7 }, hasMoved: true },
    //         { player: Player.BLACK, type: PieceType.QUEEN, position: { file: ChessFile.B, rank: 2 } },
    //     ];

    //     expect(result).toEqual(expect.arrayContaining(expectedResult));
    //     expect(result.length).toEqual(expectedResult.length);
    // });
});
