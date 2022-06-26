/**
 * Win for black in 2 moves
 * https://en.wikipedia.org/wiki/Fool%27s_mate#:~:text=In%20chess%2C%20Fool's%20Mate%2C%20also,second%20move%20with%20the%20queen.
 */

import { GameState } from "../src/GameState";
import { playFoolsMate } from "../test-utils/playFoolsMate";

describe(`Fools's mate`, () => {
    test('play all the moves, check that black has won', () => {
        const game = playFoolsMate();

        expect(game.getState()).toEqual(GameState.BLACK_WON);
    });
});
