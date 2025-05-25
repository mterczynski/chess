import { LobbyService } from "./lobby.service";
import {
    BadRequestException,
    ConflictException,
    NotFoundException,
} from "@nestjs/common";
import { GameState, ChessFile, Move } from "game-engine";
import { UserService } from "../user/user.service";

describe("LobbyService", () => {
    let service: LobbyService;
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();
        // Register a user to use for lobby creation
        userService.registerUser("testuser");
        service = new LobbyService(userService);
    });

    it("should create a lobby with valid data", () => {
        const result = service.createLobby({
            name: "test",
            password: "pw",
            userId: "1",
        });
        expect(result).toEqual({ id: 1, name: "test" });
    });

    it("should throw ConflictException for duplicate name+password", () => {
        service.createLobby({ name: "test", password: "pw", userId: "1" });
        expect(() =>
            service.createLobby({ name: "test", password: "pw", userId: "1" }),
        ).toThrow(ConflictException);
    });

    it("should allow same name with different password", () => {
        service.createLobby({ name: "test", password: "pw1", userId: "1" });
        expect(() =>
            service.createLobby({ name: "test", password: "pw2", userId: "1" }),
        ).not.toThrow();
    });

    it("should throw BadRequestException for non-string name or password", () => {
        expect(() =>
            service.createLobby({
                name: 123 as any,
                password: "pw",
                userId: "1",
            }),
        ).toThrow(BadRequestException);
        expect(() =>
            service.createLobby({
                name: "test",
                password: 123 as any,
                userId: "1",
            }),
        ).toThrow(BadRequestException);
    });

    it("should throw NotFoundException for non-existent user", () => {
        expect(() =>
            service.createLobby({
                name: "test",
                password: "pw",
                userId: "999",
            }),
        ).toThrow(NotFoundException);
    });

    it("should list all lobbies without passwords", () => {
        service.createLobby({ name: "lobby1", password: "pw1", userId: "1" });
        service.createLobby({ name: "lobby2", password: "pw2", userId: "1" });
        const lobbies = service.getLobbies();
        expect(Array.isArray(lobbies)).toBe(true);
        expect(lobbies.length).toBe(2);
        expect(lobbies[0]).toHaveProperty("id");
        expect(lobbies[0]).toHaveProperty("name");
        expect(lobbies[0]).toHaveProperty("moves");
        expect(lobbies[0]).toHaveProperty("gameState");
        expect(lobbies[0]).not.toHaveProperty("password");
    });

    it("should get a lobby by id with all useful fields", () => {
        service.createLobby({ name: "lobby1", password: "pw1", userId: "1" });
        const lobby = service.getLobby("1");
        expect(lobby).toMatchObject({
            id: 1,
            name: "lobby1",
            moves: 0,
            gameState: GameState.UNSTARTED,
        });
        expect(lobby).toHaveProperty("currentPlayer");
        expect(lobby).toHaveProperty("board");
        expect(lobby).toHaveProperty("availableMoves");
    });

    it("should throw NotFoundException for non-existent lobby", () => {
        expect(() => service.getLobby("999")).toThrow(NotFoundException);
    });

    it("should make a valid move when password is correct", () => {
        service.createLobby({ name: "lobby1", password: "pw1", userId: "1" });
        const move: Move = {
            from: { file: ChessFile.E, rank: 2 },
            to: { file: ChessFile.E, rank: 4 },
        };
        const result = service.move("1", { move, password: "pw1" });
        expect(result.moves).toBe(1);
        expect(result.availableMoves).toBeDefined();
        expect(result.board).toBeDefined();
        expect(result.currentPlayer).not.toBeUndefined();
    });

    it("should throw BadRequestException for incorrect password", () => {
        service.createLobby({ name: "lobby1", password: "pw1", userId: "1" });
        const move: Move = {
            from: { file: ChessFile.E, rank: 2 },
            to: { file: ChessFile.E, rank: 4 },
        };
        expect(() => service.move("1", { move, password: "wrong" })).toThrow(
            BadRequestException,
        );
    });

    it("should throw NotFoundException for non-existent lobby on move", () => {
        const move: Move = {
            from: { file: ChessFile.E, rank: 2 },
            to: { file: ChessFile.E, rank: 4 },
        };
        expect(() => service.move("999", { move, password: "pw1" })).toThrow(
            NotFoundException,
        );
    });

    it("should throw BadRequestException for invalid move and have correct message", () => {
        service.createLobby({ name: "lobby1", password: "pw1", userId: "1" });
        // Invalid move: moving from an empty square
        const move: Move = {
            from: { file: ChessFile.A, rank: 3 },
            to: { file: ChessFile.A, rank: 4 },
        };
        try {
            service.move("1", { move, password: "pw1" });
            fail("Expected BadRequestException to be thrown");
        } catch (e) {
            expect(e).toBeInstanceOf(BadRequestException);
            expect(e.message).toContain("Invalid move");
        }
    });
});
