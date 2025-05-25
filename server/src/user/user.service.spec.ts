import { UserService } from "./user.service";
import { BadRequestException, ConflictException } from "@nestjs/common";

describe("UserService", () => {
    let service: UserService;

    beforeEach(() => {
        service = new UserService();
    });

    it("should register a user with valid name", () => {
        const user = service.registerUser("user_1");
        expect(user).toEqual({ id: 1, name: "user_1" });
    });

    it("should increment id for each new user", () => {
        const user1 = service.registerUser("user1");
        const user2 = service.registerUser("user2");
        expect(user1.id).toBe(1);
        expect(user2.id).toBe(2);
    });

    it("should throw BadRequestException for invalid name", () => {
        expect(() => service.registerUser("")).toThrow(BadRequestException);
        expect(() => service.registerUser("a".repeat(16))).toThrow(
            BadRequestException,
        );
        expect(() => service.registerUser("invalid name!")).toThrow(
            BadRequestException,
        );
        expect(() => service.registerUser("user@name")).toThrow(
            BadRequestException,
        );
    });

    it("should throw ConflictException for duplicate name", () => {
        service.registerUser("user1");
        expect(() => service.registerUser("user1")).toThrow(ConflictException);
    });
});
