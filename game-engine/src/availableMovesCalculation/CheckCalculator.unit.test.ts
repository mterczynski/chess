import { Move, MoveType } from "../Moves";
import { PieceType, PieceWithPosition } from "../pieces";
import { createBishop, createKing, createKnight, createPawn, createQueen, createRook } from "../pieces/PieceFactory";
import { Player } from "../Player";
import { ChessFile, Position } from "../positions";
import { getEmptyBoard } from "../../test-utils/getEmptyBoard";
import { CheckCalculator } from "./CheckCalculator";

describe('CheckCalculator', () => {
    it('should return enemy pieces (together with their positions) that cause checks on provided board', () => {
        const board = getEmptyBoard();

        const whiteKingPosition: Position = { file: ChessFile.G, rank: 2 };

        board.A[8] = createKing(Player.BLACK, true);
        board.G[2] = createKing(Player.WHITE, true);
        // pieces checking white king
        board.H[3] = createPawn(Player.BLACK);
        board.E[3] = createKnight(Player.BLACK);
        board.D[5] = createBishop(Player.BLACK);
        board.G[7] = createRook(Player.BLACK, true);
        board.B[2] = createQueen(Player.BLACK);
        // black pieces not checking white king
        board.B[8] = createPawn(Player.BLACK);
        board.C[8] = createKnight(Player.BLACK);
        board.D[8] = createBishop(Player.BLACK);
        board.E[8] = createRook(Player.BLACK, true);
        board.F[8] = createQueen(Player.BLACK);

        // not all moves are included
        const availableEnemyMovesIgnoringKingSafety: Move[] = [
            // all king-capturing/checking moves
            { from: { file: ChessFile.H, rank: 3 }, to: whiteKingPosition, isAttacking: true, type: MoveType.STANDARD },
            { from: { file: ChessFile.E, rank: 3 }, to: whiteKingPosition, isAttacking: true, type: MoveType.STANDARD },
            { from: { file: ChessFile.D, rank: 5 }, to: whiteKingPosition, isAttacking: true, type: MoveType.STANDARD },
            { from: { file: ChessFile.G, rank: 7 }, to: whiteKingPosition, isAttacking: true, type: MoveType.STANDARD },
            { from: { file: ChessFile.B, rank: 2 }, to: whiteKingPosition, isAttacking: true, type: MoveType.STANDARD },
            // some of non-checking moves
            { from: { file: ChessFile.H, rank: 3 }, to: { file: ChessFile.H, rank: 2 }, isAttacking: false, type: MoveType.STANDARD },
            { from: { file: ChessFile.E, rank: 3 }, to: { file: ChessFile.G, rank: 4 }, isAttacking: false, type: MoveType.STANDARD },
            { from: { file: ChessFile.D, rank: 5 }, to: { file: ChessFile.C, rank: 6 }, isAttacking: false, type: MoveType.STANDARD },
            { from: { file: ChessFile.G, rank: 7 }, to: { file: ChessFile.G, rank: 8 }, isAttacking: false, type: MoveType.STANDARD },
            { from: { file: ChessFile.B, rank: 2 }, to: { file: ChessFile.B, rank: 1 }, isAttacking: false, type: MoveType.STANDARD },
        ];

        const result = new CheckCalculator().getCheckingEnemyPieces(Player.WHITE, board, availableEnemyMovesIgnoringKingSafety);
        const expectedResult: PieceWithPosition[] = [
            { player: Player.BLACK, type: PieceType.PAWN, position: { file: ChessFile.H, rank: 3 } },
            { player: Player.BLACK, type: PieceType.KNIGHT, position: { file: ChessFile.E, rank: 3 } },
            { player: Player.BLACK, type: PieceType.BISHOP, position: { file: ChessFile.D, rank: 5 } },
            { player: Player.BLACK, type: PieceType.ROOK, position: { file: ChessFile.G, rank: 7 }, hasMoved: true },
            { player: Player.BLACK, type: PieceType.QUEEN, position: { file: ChessFile.B, rank: 2 } },
        ];

        expect(result).toEqual(expect.arrayContaining(expectedResult));
        expect(result.length).toEqual(expectedResult.length);
    });
});
