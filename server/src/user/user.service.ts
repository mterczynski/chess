import {
    Injectable,
    BadRequestException,
    ConflictException,
} from "@nestjs/common";
import { User } from "./user";

@Injectable()
export class UserService {
    private users: User[] = [];
    private idCounter = 1;

    registerUser(name: string): User {
        // Validate name: 1-15 chars, letters, digits, hyphens, underscores
        if (typeof name !== "string" || !/^[a-zA-Z0-9_-]{1,15}$/.test(name)) {
            throw new BadRequestException(
                "Name must be 1-15 characters: letters, digits, hyphens, or underscores.",
            );
        }

        // Check for duplicate name
        if (this.users.some((user) => user.name === name)) {
            throw new ConflictException("User name already taken");
        }

        const user: User = { id: this.idCounter++, name };
        this.users.push(user);

        return user;
    }

    getUserById(userId: number): User | null {
        return this.users.find((user) => user.id === userId) ?? null;
    }
}
