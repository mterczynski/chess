import { ChessFile, Game, Move, Player } from "game-engine";
import {
    buildGeminiRequestBody,
    buildSystemPrompt,
    buildUserPrompt,
    GEMINI_MOVE_RESPONSE_SCHEMA,
    GeminiMoveContext,
} from "./buildGeminiRequest";

describe("buildSystemPrompt", () => {
    it("includes the player Gemini plays as", () => {
        expect(buildSystemPrompt(Player.BLACK, 1600)).toContain("BLACK");
        expect(buildSystemPrompt(Player.WHITE, 1600)).toContain("WHITE");
    });

    it("includes the requested FIDE rating", () => {
        const prompt = buildSystemPrompt(Player.BLACK, 2150);

        expect(prompt).toContain("FIDE rating of 2150");
    });

    it("instructs Gemini to pick a move from the available moves", () => {
        const prompt = buildSystemPrompt(Player.BLACK, 1600);

        expect(prompt).toContain('"availableMoves"');
        expect(prompt).toContain("JSON");
    });
});

describe("buildUserPrompt and buildGeminiRequestBody", () => {
    const createContext = (): GeminiMoveContext => {
        const game = new Game();
        const lastMove: Move = {
            from: { file: ChessFile.E, rank: 2 },
            to: { file: ChessFile.E, rank: 4 },
        };
        game.move(lastMove);

        return {
            player: Player.BLACK,
            elo: 1800,
            board: game.getBoard(),
            lastMove,
            availableMoves: game.getAvailableMovesForPlayer(),
        };
    };

    it("serializes board, last move and available moves as JSON", () => {
        const context = createContext();

        const payload = JSON.parse(buildUserPrompt(context));

        expect(payload).toEqual({
            board: context.board,
            lastMove: context.lastMove,
            availableMoves: context.availableMoves,
        });
    });

    it("builds a request body with system instruction and user content", () => {
        const context = createContext();

        const body = buildGeminiRequestBody(context) as any;

        expect(body.systemInstruction.parts[0].text).toContain(
            "FIDE rating of 1800",
        );
        expect(body.contents).toHaveLength(1);
        expect(body.contents[0].role).toBe("user");
        expect(JSON.parse(body.contents[0].parts[0].text).lastMove).toEqual(
            context.lastMove,
        );
    });

    it("requests structured JSON output matching the Move schema", () => {
        const body = buildGeminiRequestBody(createContext()) as any;

        expect(body.generationConfig.responseMimeType).toBe(
            "application/json",
        );
        expect(body.generationConfig.responseSchema).toEqual(
            GEMINI_MOVE_RESPONSE_SCHEMA,
        );
        expect(
            body.generationConfig.responseSchema.required,
        ).toEqual(["from", "to"]);
    });
});
