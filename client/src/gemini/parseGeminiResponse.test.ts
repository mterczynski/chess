import {
    ChessFile,
    Game,
    Move,
    PieceType,
    PromotionMove,
    SpecialMoveType,
} from "game-engine";
import {
    GeminiResponseError,
    parseGeminiMove,
} from "./parseGeminiResponse";

describe("parseGeminiMove", () => {
    const availableMoves = new Game().getAvailableMovesForPlayer();

    it("returns the matching available move", () => {
        const responseText = JSON.stringify({
            from: { file: "E", rank: 2 },
            to: { file: "E", rank: 4 },
        });

        const move = parseGeminiMove(responseText, availableMoves);

        expect(move.from).toEqual({ file: ChessFile.E, rank: 2 });
        expect(move.to).toEqual({ file: ChessFile.E, rank: 4 });
        expect(availableMoves).toContain(move);
    });

    it("throws GeminiResponseError for invalid JSON", () => {
        expect(() =>
            parseGeminiMove("e2 to e4", availableMoves),
        ).toThrow(GeminiResponseError);
    });

    it("throws GeminiResponseError when positions are malformed", () => {
        const missingTo = JSON.stringify({ from: { file: "E", rank: 2 } });
        const invalidFile = JSON.stringify({
            from: { file: "X", rank: 2 },
            to: { file: "E", rank: 4 },
        });
        const invalidRank = JSON.stringify({
            from: { file: "E", rank: 2 },
            to: { file: "E", rank: 9 },
        });

        expect(() => parseGeminiMove(missingTo, availableMoves)).toThrow(
            GeminiResponseError,
        );
        expect(() => parseGeminiMove(invalidFile, availableMoves)).toThrow(
            GeminiResponseError,
        );
        expect(() => parseGeminiMove(invalidRank, availableMoves)).toThrow(
            GeminiResponseError,
        );
    });

    it("throws GeminiResponseError for a move that is not available", () => {
        const illegalMove = JSON.stringify({
            from: { file: "E", rank: 2 },
            to: { file: "E", rank: 5 },
        });

        expect(() => parseGeminiMove(illegalMove, availableMoves)).toThrow(
            GeminiResponseError,
        );
    });

    describe("promotions", () => {
        const promotionMoves: Move[] = [
            {
                from: { file: ChessFile.A, rank: 7 },
                to: { file: ChessFile.A, rank: 8 },
                type: SpecialMoveType.PROMOTION,
            } as Move,
        ];

        it("keeps the promotion piece returned by Gemini", () => {
            const responseText = JSON.stringify({
                from: { file: "A", rank: 7 },
                to: { file: "A", rank: 8 },
                promoteTo: "N",
            });

            const move = parseGeminiMove(
                responseText,
                promotionMoves,
            ) as PromotionMove;

            expect(move.type).toBe(SpecialMoveType.PROMOTION);
            expect(move.promoteTo).toBe(PieceType.KNIGHT);
        });

        it("defaults to a queen promotion when promoteTo is missing or invalid", () => {
            const withoutPromoteTo = JSON.stringify({
                from: { file: "A", rank: 7 },
                to: { file: "A", rank: 8 },
            });
            const withInvalidPromoteTo = JSON.stringify({
                from: { file: "A", rank: 7 },
                to: { file: "A", rank: 8 },
                promoteTo: "K",
            });

            expect(
                (
                    parseGeminiMove(
                        withoutPromoteTo,
                        promotionMoves,
                    ) as PromotionMove
                ).promoteTo,
            ).toBe(PieceType.QUEEN);
            expect(
                (
                    parseGeminiMove(
                        withInvalidPromoteTo,
                        promotionMoves,
                    ) as PromotionMove
                ).promoteTo,
            ).toBe(PieceType.QUEEN);
        });
    });
});
