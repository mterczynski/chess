import { GameStateHandler } from "./GameStateHandler";
import { GameState } from "./GameState";
import { Player } from "./Player";
import { Board } from "./Board";
import { getEmptyBoard } from "game-engine/test-utils/getEmptyBoard";
import { Move } from "./Moves";
import { ChessFile } from "./positions";

describe("GameStateHandler", () => {
    let handler: GameStateHandler;
    let availableMoveCalculator: any;
    let checkCalculator: any;
    let board: Board;
    let mockFirstMove: Move;
    let mockKnightMove: Move;

    beforeEach(() => {
        // Mock dependencies
        availableMoveCalculator = {
            getAvailableMovesForPlayer: jest.fn(),
        };
        checkCalculator = {
            getCheckingEnemyPieces: jest.fn(),
        };
        handler = new GameStateHandler(availableMoveCalculator, checkCalculator);
        board = getEmptyBoard();
        mockFirstMove = {from: {file: ChessFile.E, rank: 2}, to: {file: ChessFile.E, rank: 4}};
        mockKnightMove = {from: {file: ChessFile.G, rank: 1}, to: {file: ChessFile.F, rank: 3}};
    });

    it("should return DRAW_BY_REPETITION if position occurred 3 times", () => {
        const positionCountsMock = { "key": 3 };
        jest.spyOn(require("./utils/serializeBoardState"), "serializeBoardState").mockReturnValue("key");
        const result = handler.getNewGameStateAfterMove(
            board,
            Player.WHITE,
            positionCountsMock,
            GameState.IN_PROGRESS,
            mockKnightMove
        );
        expect(result).toBe(GameState.DRAW_BY_REPETITION);
    });

    it("should return IN_PROGRESS after first move", () => {
        jest.spyOn(require("./utils/serializeBoardState"), "serializeBoardState").mockReturnValue("unique");
        const result = handler.getNewGameStateAfterMove(
            board,
            Player.WHITE,
            {},
            GameState.UNSTARTED,
            mockFirstMove
        );
        expect(result).toBe(GameState.IN_PROGRESS);
    });

    it("should return DRAW_BY_STALEMATE if enemy has no moves and is not in check", () => {
        availableMoveCalculator.getAvailableMovesForPlayer
            .mockReturnValueOnce([]) // enemy moves
            .mockReturnValueOnce([]); // current player moves
        checkCalculator.getCheckingEnemyPieces.mockReturnValue([]);
        const result = handler.getNewGameStateAfterMove(
            board,
            Player.WHITE,
            {},
            GameState.IN_PROGRESS,
            mockKnightMove
        );
        expect(result).toBe(GameState.DRAW_BY_STALEMATE);
    });

    it("should return WHITE_WON if enemy has no moves and is in check and currentPlayer is WHITE", () => {
        availableMoveCalculator.getAvailableMovesForPlayer
            .mockReturnValueOnce([]) // enemy moves
            .mockReturnValueOnce([mockKnightMove]); // current player moves
        checkCalculator.getCheckingEnemyPieces.mockReturnValue([
            { player: Player.BLACK, type: "ROOK" }
        ]);
        const result = handler.getNewGameStateAfterMove(
            board,
            Player.WHITE,
            {},
            GameState.IN_PROGRESS,
            mockKnightMove
        );
        expect(result).toBe(GameState.WHITE_WON);
    });

    it("should return BLACK_WON if enemy has no moves and is in check and currentPlayer is BLACK", () => {
        availableMoveCalculator.getAvailableMovesForPlayer
            .mockReturnValueOnce([]) // enemy moves
            .mockReturnValueOnce([mockKnightMove]); // current player moves
        checkCalculator.getCheckingEnemyPieces.mockReturnValue([
            { player: Player.WHITE, type: "QUEEN" }
        ]);
        const result = handler.getNewGameStateAfterMove(
            board,
            Player.BLACK,
            {},
            GameState.IN_PROGRESS,
            mockKnightMove
        );
        expect(result).toBe(GameState.BLACK_WON);
    });

    it("should return currentState if none of the special conditions are met", () => {
        availableMoveCalculator.getAvailableMovesForPlayer.mockReturnValue([mockKnightMove]);
        const result = handler.getNewGameStateAfterMove(
            board,
            Player.WHITE,
            {},
            GameState.IN_PROGRESS,
            mockKnightMove
        );
        expect(result).toBe(GameState.IN_PROGRESS);
    });
});
