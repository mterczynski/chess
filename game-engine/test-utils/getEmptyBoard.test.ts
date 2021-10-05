import { ChessFile } from "../positions"
import { getEmptyBoard } from "./getEmptyBoard"

describe('getEmptyBoard', () => {
    it('returns an empty board', () => {
        expect(getEmptyBoard()).toEqual(
            {
                [ChessFile.A]: [null, null, null, null, null, null, null, null, null],
                [ChessFile.B]: [null, null, null, null, null, null, null, null, null],
                [ChessFile.C]: [null, null, null, null, null, null, null, null, null],
                [ChessFile.D]: [null, null, null, null, null, null, null, null, null],
                [ChessFile.E]: [null, null, null, null, null, null, null, null, null],
                [ChessFile.F]: [null, null, null, null, null, null, null, null, null],
                [ChessFile.G]: [null, null, null, null, null, null, null, null, null],
                [ChessFile.H]: [null, null, null, null, null, null, null, null, null],
            }
        )
    });
});
