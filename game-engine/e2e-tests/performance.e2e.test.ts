import { playFoolsMate } from "../test-utils/playFoolsMate";

describe("Performance", () => {
    // TODO - improve performance
    test("number of fool mate games played in a second should be at least 10", () => {
        const start = Date.now();
        let gamesPlayedInSecond = 0;

        while (Date.now() - start < 1000) {
            playFoolsMate();
            gamesPlayedInSecond++;
        }

        console.log("Games played in:");
        console.table([
            ["second", gamesPlayedInSecond],
            ["minute", gamesPlayedInSecond * 60],
            ["hour", gamesPlayedInSecond * 60 * 60],
        ]);

        expect(gamesPlayedInSecond).toBeGreaterThan(20);
    });
});
