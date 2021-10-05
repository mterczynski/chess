import { SpecialMoveType } from "../Moves";
import { ChessFile } from "../positions";
import { isCastleMove } from "./isCastleMove";

describe('isCastleMove', () => {
    it('returns true if the move is a castle move', () => {
        4
        expect(isCastleMove({ from: { file: ChessFile.E, rank: 1 }, to: { file: ChessFile.G, rank: 1 }, type: SpecialMoveType.CASTLE })).toEqual(true);
    });

    it('returns false if the move is a normal move', () => {
        expect(isCastleMove({ from: { file: ChessFile.A, rank: 1 }, to: { file: ChessFile.B, rank: 1 } })).toEqual(false);
    });

    it('returns false if the move is an en passant move', () => {
        expect(isCastleMove({ from: { file: ChessFile.A, rank: 5 }, to: { file: ChessFile.B, rank: 6 }, type: SpecialMoveType.EN_PASSANT })).toEqual(false);
    });
})
