import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { User } from "./user";
import { BadRequestException, ConflictException } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserController } from "./user.controller";

describe("UserController", () => {
    let service: UserService;
    let controller: UserController;
    let jwtService: JwtService;

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
            providers: [UserService, JwtService],
            controllers: [UserController],
        }).compile();
        service = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);
        controller = new UserController(service, jwtService);
    });

    it("should register a user and return JWT", async () => {
        const res = await controller.registerUser({
            name: "user_1",
            password: "password123",
        });
        expect(res.id).toBeDefined();
        expect(res.name).toBe("user_1");
        expect(typeof res.token).toBe("string");
        // Optionally: decode and check payload
        const payload = jwtService.decode(res.token) as any;
        expect(payload.name).toBe("user_1");
        expect(payload.sub).toBe(res.id);
    });

    it("should not allow duplicate usernames", async () => {
        await controller.registerUser({
            name: "user_1",
            password: "password123",
        });
        await expect(
            controller.registerUser({
                name: "user_1",
                password: "password123",
            }),
        ).rejects.toThrow(ConflictException);
    });

    it("should not allow invalid usernames", async () => {
        await expect(
            controller.registerUser({ name: "", password: "password123" }),
        ).rejects.toThrow(BadRequestException);
        await expect(
            controller.registerUser({
                name: "a".repeat(16),
                password: "password123",
            }),
        ).rejects.toThrow(BadRequestException);
        await expect(
            controller.registerUser({
                name: "invalid name!",
                password: "password123",
            }),
        ).rejects.toThrow(BadRequestException);
    });

    it("should not allow short passwords", async () => {
        await expect(
            controller.registerUser({ name: "user_2", password: "123" }),
        ).rejects.toThrow(BadRequestException);
    });

    it("should login and return JWT for valid credentials", async () => {
        await controller.registerUser({
            name: "user_3",
            password: "password123",
        });
        const res = await controller.loginUser({
            name: "user_3",
            password: "password123",
        });
        expect(res.id).toBeDefined();
        expect(res.name).toBe("user_3");
        expect(typeof res.token).toBe("string");
        const payload = jwtService.decode(res.token) as any;
        expect(payload.name).toBe("user_3");
        expect(payload.sub).toBe(res.id);
    });

    it("should not login with wrong password", async () => {
        await controller.registerUser({
            name: "user_4",
            password: "password123",
        });
        await expect(
            controller.loginUser({ name: "user_4", password: "wrongpass" }),
        ).rejects.toThrow();
    });
});
