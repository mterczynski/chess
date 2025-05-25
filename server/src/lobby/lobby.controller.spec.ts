import { Test, TestingModule } from "@nestjs/testing";
import { LobbyController } from "./lobby.controller";
import { ChessFile, GameState, Move } from "game-engine";
import {
    BadRequestException,
    ConflictException,
    NotFoundException,
} from "@nestjs/common";

describe("LobbyController", () => {
    let controller: LobbyController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LobbyController],
        }).compile();

        controller = module.get<LobbyController>(LobbyController);
    });

    describe("LobbyController", () => {
        let controller: LobbyController;

        beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                controllers: [LobbyController],
            }).compile();

            controller = module.get<LobbyController>(LobbyController);
        });

        describe("createLobby", () => {
            it("should create a lobby and prevent duplicate name+password", () => {
                // Create a new lobby
                const result1 = controller.createLobby({
                    name: "test",
                    password: "123",
                });
                expect(result1).toEqual({ id: 1, name: "test" });

                // Try to create the same lobby again
                expect(() =>
                    controller.createLobby({
                        name: "test",
                        password: "123",
                    }),
                ).toThrow(ConflictException);

                // Different password is allowed
                const result3 = controller.createLobby({
                    name: "test",
                    password: "456",
                });
                expect(result3).toEqual({ id: 2, name: "test" });

                // Different name is allowed
                const result4 = controller.createLobby({
                    name: "other",
                    password: "123",
                });
                expect(result4).toEqual({ id: 3, name: "other" });
            });

            it("should reject non-string name or password", () => {
                expect(() =>
                    controller.createLobby({
                        name: 123 as any,
                        password: "abc",
                    }),
                ).toThrow(BadRequestException);
                expect(() =>
                    controller.createLobby({
                        name: "abc",
                        password: 123 as any,
                    }),
                ).toThrow(BadRequestException);
            });
        });

        describe("getLobbies", () => {
            it("should return all lobbies without passwords", () => {
                // Create two lobbies
                controller.createLobby({ name: "lobby1", password: "pw1" });
                controller.createLobby({ name: "lobby2", password: "pw2" });

                const result = controller.getLobbies();
                expect(Array.isArray(result)).toBe(true);
                expect(result.length).toBe(2);

                // Check exact name values and properties for the first two lobbies
                expect(result[0].id).toBe(1);
                expect(result[1].id).toBe(2);
                expect(result[0].name).toBe("lobby1");
                expect(result[1].name).toBe("lobby2");
                expect(result[0]).not.toHaveProperty("password");
                expect(result[1]).not.toHaveProperty("password");
                expect(result[0].moves).toBe(0);
                expect(result[1].moves).toBe(0);
                expect(result[0].gameState).toBe(GameState.UNSTARTED);
                expect(result[1].gameState).toBe(GameState.UNSTARTED);
            });
        });

        describe("getLobby", () => {
            it("should return the correct lobby by id", () => {
                controller.createLobby({ name: "lobby1", password: "pw1" });
                controller.createLobby({ name: "lobby2", password: "pw2" });

                const lobby1 = controller.getLobby("1");
                const lobby2 = controller.getLobby("2");

                expect(lobby1).toMatchObject({
                    id: 1,
                    name: "lobby1",
                    moves: 0,
                    gameState: GameState.UNSTARTED,
                });
                expect(lobby2).toMatchObject({
                    id: 2,
                    name: "lobby2",
                    moves: 0,
                    gameState: GameState.UNSTARTED,
                });
            });

            it("should throw NotFoundException for non-existent id", () => {
                expect(() => controller.getLobby("999")).toThrowError(
                    "Lobby not found.",
                );
            });
        });

        describe("move", () => {
            it("should make a valid move when password is correct", () => {
                controller.createLobby({ name: "lobby1", password: "pw1" });
                const move: Move = {
                    from: { file: ChessFile.D, rank: 2 },
                    to: { file: ChessFile.D, rank: 4 },
                };
                const result = controller.move("1", { move, password: "pw1" });
                expect(result.id).toBe(1);
                expect(result.moves).toBe(1);
                expect(result.name).toBe("lobby1");
                expect(result.gameState).toBe(GameState.IN_PROGRESS);
            });

            it("should throw BadRequestException for incorrect password", () => {
                controller.createLobby({ name: "lobby1", password: "pw1" });
                const move: Move = {
                    from: { file: ChessFile.D, rank: 2 },
                    to: { file: ChessFile.D, rank: 4 },
                };
                expect(() =>
                    controller.move("1", {
                        move,
                        password: "wrong",
                    }),
                ).toThrow(BadRequestException);
            });

            it("should throw NotFoundException for non-existent lobby", () => {
                const move: Move = {
                    from: { file: ChessFile.D, rank: 2 },
                    to: { file: ChessFile.D, rank: 4 },
                };
                expect(() =>
                    controller.move("999", { move, password: "pw1" }),
                ).toThrow(NotFoundException);
            });

            it("should throw BadRequestException for invalid move", () => {
                controller.createLobby({ name: "lobby1", password: "pw1" });
                // Invalid move: moving black's piece in first move
                const move: Move = {
                    from: { file: ChessFile.E, rank: 7 },
                    to: { file: ChessFile.E, rank: 5 },
                };
                try {
                    controller.move("1", { move, password: "pw1" });
                    // If no error is thrown, fail the test
                    fail("Expected BadRequestException to be thrown");
                } catch (e) {
                    expect(e).toBeInstanceOf(BadRequestException);
                    expect(e.message).toContain("Invalid move");
                }
            });
        });
    });
});
