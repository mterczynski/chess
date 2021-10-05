import { Player } from "../Player";
import { ChessFile } from "../positions";
import { getEmptyBoard } from "../../test-utils/getEmptyBoard";
import { getPlayerKing } from "./getPlayerKing";
import { PieceType } from "./PieceType";

describe('getPlayerKing', () => {
    const board = getEmptyBoard();

    board[ChessFile.C][7] = {type: PieceType.KING, player: Player.WHITE, hasMoved: true};
    board[ChessFile.G][8] = {type: PieceType.KING, player: Player.BLACK, hasMoved: true};

    it('can return black king', () => {
        expect(getPlayerKing(Player.BLACK, board)).toEqual({
            type: PieceType.KING,
            player: Player.BLACK,
            hasMoved: true,
            position: {
                file: ChessFile.G,
                rank: 8
            }
        });
    });

    it('can return white king', () => {
        expect(getPlayerKing(Player.WHITE, board)).toEqual({
            type: PieceType.KING,
            player: Player.WHITE,
            hasMoved: true,
            position: {
                file: ChessFile.C,
                rank: 7
            }
        });
    });
});
