import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { User } from "./user";
import { BadRequestException, ConflictException } from "@nestjs/common";

describe("UserService", () => {
    let service: UserService;

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
                TypeOrmModule.forFeature([User]),
            ],
            providers: [UserService],
        }).compile();
        service = module.get<UserService>(UserService);
    });

    it("should register a user with valid name and password", async () => {
        const user = await service.registerUser("user_1", "password123");
        expect(user.id).toBeDefined();
        expect(user.name).toBe("user_1");
    });

    it("should increment id for each new user", async () => {
        const user1 = await service.registerUser("user1", "password123");
        const user2 = await service.registerUser("user2", "password123");
        expect(user1.id).not.toBe(user2.id);
    });

    it("should throw BadRequestException for invalid name", async () => {
        await expect(service.registerUser("", "password123")).rejects.toThrow(
            BadRequestException,
        );
        await expect(
            service.registerUser("a".repeat(16), "password123"),
        ).rejects.toThrow(BadRequestException);
        await expect(
            service.registerUser("invalid name!", "password123"),
        ).rejects.toThrow(BadRequestException);
        await expect(
            service.registerUser("user@name", "password123"),
        ).rejects.toThrow(BadRequestException);
    });

    it("should throw ConflictException for duplicate name", async () => {
        await service.registerUser("user1", "password123");
        await expect(
            service.registerUser("user1", "password123"),
        ).rejects.toThrow(ConflictException);
    });
});
