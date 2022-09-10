// https://www.chessprogramming.org/Perft
// https://www.chessprogramming.org/Perft_Results

import { Game } from "../";

describe("Perft", () => {
    function getAvailableMovesAmountForGameTree(
        game: Game,
        depth: number
    ): number {
        if (depth === 0) {
            return 0;
        }

        const moves = game.getAvailableMovesForPlayer();
        const temp = moves
            .map((move) => {
                const gameClone = game.clone();
                gameClone.move(move);
                // console.log(getAvailableMovesAmountForGameTree(gameClone, depth - 1));
                return getAvailableMovesAmountForGameTree(gameClone, depth - 1);
            })
            .reduce((acc, next) => acc + next, 0);

        return moves.length + temp;
    }

    let startDate: number;

    beforeAll(() => {
        startDate = Date.now();
    });

    afterAll(() => {
        const timeElapsed = (Date.now() - startDate) / 1000;
        console.log(`Perft took ${timeElapsed} s`);
    });

    it("is 20 for maxDepth=1", () => {
        const game = new Game();
        game.disableMoveValidityChecking();
        expect(getAvailableMovesAmountForGameTree(game, 1)).toEqual(20);
    });

    it("is 400 for maxDepth=2", () => {
        const game = new Game();
        game.disableMoveValidityChecking();
        expect(getAvailableMovesAmountForGameTree(game, 2)).toEqual(400 + 20);
    });

    // commented due to slow speed

    // it("is 8902 for maxDepth=3", () => {
    //     const game = new Game();
    //     game.disableMoveValidityChecking();
    //     expect(getAvailableMovesAmountForGameTree(game, 3)).toEqual(
    //         8902 + 400 + 20
    //     );
    // });

    // it("is 197281 for maxDepth=4", () => {
    //     const game = new Game();
    //     expect(getAvailableMovesAmountForGameTree(game, 4)).toEqual(
    //         197281 + 8902 + 400 + 20
    //     );
    // });

    // it('is 4865609 for maxDepth=5', () => {
    //     const game = new Game();
    //     expect(getAvailableMovesAmountForGameTree(game, 5)).toEqual(4865609);
    // });
});
