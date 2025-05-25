import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    registerUser(@Body() body: { name: string }) {
        const user = this.userService.registerUser(body.name);
        return { id: user.id, name: user.name };
    }
}
