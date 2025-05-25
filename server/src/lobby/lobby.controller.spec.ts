import { Test, TestingModule } from "@nestjs/testing";
import { LobbyController } from "./lobby.controller";
import { GameState } from "game-engine";

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
            expect(result1).toEqual({ success: true });

            // Try to create the same lobby again
            const result2 = controller.createLobby({
                name: "test",
                password: "123",
            });
            expect(result2).toEqual({
                success: false,
                message: "A lobby with this name and password already exists.",
            });

            // Different password is allowed
            const result3 = controller.createLobby({
                name: "test",
                password: "456",
            });
            expect(result3).toEqual({ success: true });

            // Different name is allowed
            const result4 = controller.createLobby({
                name: "other",
                password: "123",
            });
            expect(result4).toEqual({ success: true });
        });

        it("should reject non-string name or password", () => {
            expect(
                controller.createLobby({ name: 123 as any, password: "abc" }),
            ).toEqual({
                success: false,
                message: "Name and password must be strings.",
            });
            expect(
                controller.createLobby({ name: "abc", password: 123 as any }),
            ).toEqual({
                success: false,
                message: "Name and password must be strings.",
            });
        });
    });

    describe("getLobbies", () => {
        it("should return all lobbies without passwords", () => {
            // Create two lobbies
            controller.createLobby({ name: "lobby1", password: "pw1" });
            controller.createLobby({ name: "lobby2", password: "pw2" });

            const result = controller.getLobbies();
            expect(result.success).toBe(true);
            expect(Array.isArray(result.lobbies)).toBe(true);
            expect(result.lobbies.length).toBe(2);

            // Check exact name values and properties for the first two lobbies
            expect(result.lobbies[0].id).toBe(1);
            expect(result.lobbies[1].id).toBe(2);
            expect(result.lobbies[0].name).toBe("lobby1");
            expect(result.lobbies[1].name).toBe("lobby2");
            expect(result.lobbies[0]).not.toHaveProperty("password");
            expect(result.lobbies[1]).not.toHaveProperty("password");
            expect(result.lobbies[0].moves).toBe(0);
            expect(result.lobbies[1].moves).toBe(0);
            expect(result.lobbies[0].gameState).toBe(GameState.UNSTARTED);
            expect(result.lobbies[1].gameState).toBe(GameState.UNSTARTED);
        });
    });
});
