import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";

@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    @Post("register")
    async registerUser(@Body() body: { name: string; password: string }) {
        const user = await this.userService.registerUser(
            body.name,
            body.password,
        );
        const payload = { sub: user.id, name: user.name };
        const token = this.jwtService.sign(payload);
        return { id: user.id, name: user.name, token };
    }

    @Post("login")
    async loginUser(@Body() body: { name: string; password: string }) {
        const user = await this.userService.validateUser(
            body.name,
            body.password,
        );
        const payload = { sub: user.id, name: user.name };
        const token = this.jwtService.sign(payload);
        return { id: user.id, name: user.name, token };
    }
}
