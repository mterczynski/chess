import { SpecialMoveType } from "../Moves";
import { ChessFile } from "../positions";
import { isCastlingMove } from "./isCastlingMove";

describe('isCastlingMove', () => {
    it('returns true if the move is a castle move', () => {
        expect(isCastlingMove({ from: { file: ChessFile.E, rank: 1 }, to: { file: ChessFile.G, rank: 1 }, type: SpecialMoveType.CASTLING })).toEqual(true);
    });

    it('returns false if the move is a normal move', () => {
        expect(isCastlingMove({ from: { file: ChessFile.A, rank: 1 }, to: { file: ChessFile.B, rank: 1 } })).toEqual(false);
    });

    it('returns false if the move is an en passant move', () => {
        expect(isCastlingMove({ from: { file: ChessFile.A, rank: 5 }, to: { file: ChessFile.B, rank: 6 }, type: SpecialMoveType.EN_PASSANT })).toEqual(false);
    });
})
