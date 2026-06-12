import { Game, Player } from "game-engine";
import {
    GeminiApiError,
    GeminiMoveRequest,
    requestGeminiMove,
} from "./requestGeminiMove";
import { GeminiResponseError } from "./parseGeminiResponse";

describe("requestGeminiMove", () => {
    const originalFetch = global.fetch;
    let fetchMock: jest.Mock;

    const createRequest = (): GeminiMoveRequest => {
        const game = new Game();

        return {
            apiKey: "test-api-key",
            model: "gemini-2.5-flash",
            elo: 1600,
            player: Player.WHITE,
            board: game.getBoard(),
            lastMove: null,
            availableMoves: game.getAvailableMovesForPlayer(),
        };
    };

    const geminiResponse = (moveJson: object) => ({
        ok: true,
        status: 200,
        json: async () => ({
            candidates: [
                {
                    content: {
                        parts: [{ text: JSON.stringify(moveJson) }],
                    },
                },
            ],
        }),
    });

    const legalMove = {
        from: { file: "E", rank: 2 },
        to: { file: "E", rank: 4 },
    };
    const illegalMove = {
        from: { file: "E", rank: 2 },
        to: { file: "E", rank: 8 },
    };

    beforeEach(() => {
        fetchMock = jest.fn();
        global.fetch = fetchMock as any;
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("calls the Gemini API with the chosen model and API key and returns the move", async () => {
        fetchMock.mockResolvedValue(geminiResponse(legalMove));

        const move = await requestGeminiMove(createRequest());

        expect(move.from).toEqual({ file: "E", rank: 2 });
        expect(move.to).toEqual({ file: "E", rank: 4 });

        expect(fetchMock).toHaveBeenCalledTimes(1);
        const [url, options] = fetchMock.mock.calls[0];
        expect(url).toBe(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        );
        expect(options.method).toBe("POST");
        expect(options.headers["x-goog-api-key"]).toBe("test-api-key");
    });

    it("throws GeminiApiError without retrying when the API call fails", async () => {
        fetchMock.mockResolvedValue({
            ok: false,
            status: 400,
            json: async () => ({
                error: { message: "API key not valid" },
            }),
        });

        await expect(requestGeminiMove(createRequest())).rejects.toThrow(
            GeminiApiError,
        );
        await expect(
            requestGeminiMove(createRequest()),
        ).rejects.toThrow("API key not valid (status 400)");
        expect(fetchMock).toHaveBeenCalledTimes(2); // once per requestGeminiMove call
    });

    it("retries when Gemini returns an illegal move and applies the next valid one", async () => {
        fetchMock
            .mockResolvedValueOnce(geminiResponse(illegalMove))
            .mockResolvedValueOnce(geminiResponse(legalMove));

        const move = await requestGeminiMove(createRequest());

        expect(move.to).toEqual({ file: "E", rank: 4 });
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("gives up after 3 attempts of invalid moves", async () => {
        fetchMock.mockResolvedValue(geminiResponse(illegalMove));

        await expect(requestGeminiMove(createRequest())).rejects.toThrow(
            GeminiResponseError,
        );
        expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it("throws GeminiResponseError when the response contains no move text", async () => {
        fetchMock.mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ candidates: [] }),
        });

        await expect(requestGeminiMove(createRequest())).rejects.toThrow(
            GeminiResponseError,
        );
    });
});
