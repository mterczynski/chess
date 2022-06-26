import { createNewBoard } from "../utils";
import { getPlayerPieces } from "./getPlayerPieces";
import { Player } from "../Player";

describe('getPlayerPieces', () => {
    const board = createNewBoard();

    it('matches snapshot for new board, for white', () => {
        expect(getPlayerPieces(board, Player.WHITE)).toMatchSnapshot();
    });

    it('matches snapshot for new board, for black', () => {
        expect(getPlayerPieces(board, Player.BLACK)).toMatchSnapshot();
    });
})
