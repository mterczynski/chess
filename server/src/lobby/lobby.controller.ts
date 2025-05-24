import { Controller, Post, Body } from '@nestjs/common';

const lobbies: { name: string; password: string }[] = [];

@Controller('lobby')
export class LobbyController {
    @Post()
    createLobby(@Body() body: { name: string; password: string }) {
        if (
            typeof body.name !== 'string' ||
            typeof body.password !== 'string'
        ) {
            return {
                success: false,
                message: 'Name and password must be strings.',
            };
        }
        lobbies.push({ name: body.name, password: body.password });
        return { success: true };
    }
}
