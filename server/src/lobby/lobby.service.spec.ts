import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LobbyService } from "./lobby.service";
import {
    BadRequestException,
    ForbiddenException,
    NotFoundException,
} from "@nestjs/common";
import { GameState, ChessFile, Move } from "game-engine";
import { UserService } from "../user/user.service";
import { User } from "../user/user";
import { JwtModule } from "@nestjs/jwt";

describe("LobbyService", () => {
    let service: LobbyService;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: "sqlite",
                    database: ":memory:",
                    dropSchema: true,
                    entities: [User],
                    synchronize: true,
                }),
                JwtModule.register({
                    secret: "mocksecret",
                    signOptions: { expiresIn: "7d" },
                }),
                TypeOrmModule.forFeature([User]),
            ],
            providers: [UserService, LobbyService],
        }).compile();
        userService = module.get<UserService>(UserService);
        service = module.get<LobbyService>(LobbyService);
        await userService.registerUser("testuser", "password123");
    });

    describe("createLobby", () => {
        it("should create a lobby with valid data", async () => {
            const result = await service.createLobby({
                password: "pw",
                userId: "1",
            });
            expect(result).toEqual({ id: 1 });
        });

        it("should allow duplicate passwords as long as userIds are unique", async () => {
            // Register a second user and get their id
            const user2 = await userService.registerUser(
                "testuser2",
                "password456",
            );
            await service.createLobby({
                password: "pw",
                userId: "1",
            });
            await expect(
                service.createLobby({
                    password: "pw",
                    userId: user2.id.toString(),
                }),
            ).resolves.not.toThrow();
        });

        it("should allow different passwords", async () => {
            await service.createLobby({
                password: "pw1",
                userId: "1",
            });
            await expect(
                service.createLobby({
                    password: "pw2",
                    userId: "1",
                }),
            ).resolves.not.toThrow();
        });

        it("should throw BadRequestException for non-string password", async () => {
            await expect(
                service.createLobby({
                    password: 123 as any,
                    userId: "1",
                }),
            ).rejects.toThrow(BadRequestException);
        });

        it("should throw NotFoundException for non-existent user", async () => {
            await expect(
                service.createLobby({
                    password: "pw",
                    userId: "999",
                }),
            ).rejects.toThrow(NotFoundException);
        });

        it("should create a lobby with valid data and no password", async () => {
            const result = await service.createLobby({
                userId: "1",
            });
            expect(result).toEqual({ id: 1 });
        });

        it("should throw BadRequestException if userId is missing or invalid", async () => {
            await expect(
                service.createLobby({ password: "pw" } as any),
            ).rejects.toThrow(BadRequestException);
            await expect(
                service.createLobby({
                    password: "pw",
                    userId: undefined as any,
                }),
            ).rejects.toThrow(BadRequestException);
            await expect(
                service.createLobby({ password: "pw", userId: "notanumber" }),
            ).rejects.toThrow(BadRequestException);
        });
    });

    describe("getLobbies", () => {
        it("should list all lobbies without passwords", async () => {
            await service.createLobby({
                password: "pw1",
                userId: "1",
            });
            await service.createLobby({
                password: "pw2",
                userId: "1",
            });
            const lobbies = service.getLobbies();
            expect(Array.isArray(lobbies)).toBe(true);
            expect(lobbies.length).toBe(2);
            expect(lobbies[0]).toHaveProperty("id");
            expect(lobbies[0]).toHaveProperty("moves");
            expect(lobbies[0]).toHaveProperty("gameState");
            expect(lobbies[0]).not.toHaveProperty("password");
            expect(lobbies[0]).toHaveProperty("hasPassword");
            // Check correct value for hasPassword
            expect(lobbies[0].hasPassword).toBe(true);
        });
    });

    describe("getLobby", () => {
        let lobbyCreateResult: any;
        let lobbyId: string;

        beforeEach(async () => {
            lobbyCreateResult = await service.createLobby({
                password: "pw1",
                userId: "1",
            });
            lobbyId = lobbyCreateResult.id.toString();
        });

        it("should get a lobby by id with all useful fields", () => {
            const lobby = service.getLobby(lobbyId, "pw1");
            expect(lobby).toMatchObject({
                id: 1,
                moves: 0,
                gameState: GameState.UNSTARTED,
            });
            expect(lobby).toHaveProperty("currentPlayer");
            expect(lobby).toHaveProperty("board");
            expect(lobby).toHaveProperty("availableMoves");
        });

        it("should throw NotFoundException for non-existent lobby", () => {
            expect(() => service.getLobby("999", "pw1")).toThrow(
                NotFoundException,
            );
        });

        it("should throw ForbiddenException for existent lobby with incorrect password provided", () => {
            expect(() => service.getLobby(lobbyId, "pw222")).toThrow(
                ForbiddenException,
            );
        });
    });

    it("should make a valid move when password is correct", async () => {
        await service.createLobby({
            password: "pw1",
            userId: "1",
        });
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

    it("should throw BadRequestException for incorrect password", async () => {
        await service.createLobby({
            password: "pw1",
            userId: "1",
        });
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

    it("should throw BadRequestException for invalid move and have correct message", async () => {
        await service.createLobby({
            password: "pw1",
            userId: "1",
        });
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
