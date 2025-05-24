import { isDraw } from "./isDraw";
import { GameState } from "../GameState";

describe("isDraw", () => {
    it("returns true for all draw states", () => {
        expect(isDraw(GameState.DRAW_BY_STALEMATE)).toBe(true);
        expect(isDraw(GameState.DRAW_BY_INSUFFICIENT_MATERIAL)).toBe(true);
        expect(isDraw(GameState.DRAW_BY_REPETITION)).toBe(true);
        expect(isDraw(GameState.DRAW_BY_50_MOVE_RULE)).toBe(true);
        expect(isDraw(GameState.DRAW_BY_75_MOVE_RULE)).toBe(true);
        expect(isDraw(GameState.DRAW_BY_AGREEMENT)).toBe(true);
    });

    it("returns false for non-draw states", () => {
        expect(isDraw(GameState.UNSTARTED)).toBe(false);
        expect(isDraw(GameState.IN_PROGRESS)).toBe(false);
        expect(isDraw(GameState.WHITE_WON)).toBe(false);
        expect(isDraw(GameState.BLACK_WON)).toBe(false);
    });
});
