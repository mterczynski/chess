import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async registerUser(@Body() body: { name: string; password: string }) {
        const user = await this.userService.registerUser(body.name, body.password);
        return { id: user.id, name: user.name };
    }

    @Post('login')
    async loginUser(@Body() body: { name: string; password: string }) {
        const user = await this.userService.validateUser(body.name, body.password);
        return { id: user.id, name: user.name };
    }
}
