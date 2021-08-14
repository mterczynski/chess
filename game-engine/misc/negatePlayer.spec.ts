import { negatePlayer } from "./negatePlayer"
import { Player } from "../Player"

describe('negatePlayer', () => {
    it('should return black for white player', () => {
        expect(negatePlayer(Player.WHITE)).toEqual(Player.BLACK);
    });

    it('should return white for black player', () => {
        expect(negatePlayer(Player.BLACK)).toEqual(Player.WHITE);
    });
});
