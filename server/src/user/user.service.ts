import {
    Injectable,
    BadRequestException,
    ConflictException,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async registerUser(name: string, password: string): Promise<User> {
        // Validate name: 1-15 chars, letters, digits, hyphens, underscores
        if (typeof name !== "string" || !/^[a-zA-Z0-9_-]{1,15}$/.test(name)) {
            throw new BadRequestException(
                "Name must be 1-15 characters: letters, digits, hyphens, or underscores.",
            );
        }
        // Validate password: at least 6 characters
        if (!password || password.length < 6) {
            throw new BadRequestException("Password must be at least 6 characters.");
        }

        // Check for duplicate name
        const existing = await this.userRepository.findOne({ where: { name } });
        if (existing) {
            throw new ConflictException("User name already taken");
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ name, password: hashedPassword });
        return this.userRepository.save(user);
    }

    async validateUser(name: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { name } });
        if (!user) throw new NotFoundException("User not found");

        // Check if the password matches
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new UnauthorizedException("Invalid password");

        return user;
    }

    async getUserById(userId: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id: userId } });
    }
}
