import { Controller, Post, Body } from '@nestjs/common';
import { Game } from 'game-engine';

const lobbies: { name: string; password: string; gameInstance: Game }[] = [];

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
        if (
            lobbies.some(
                (lobby) =>
                    lobby.name === body.name &&
                    lobby.password === body.password,
            )
        ) {
            return {
                success: false,
                message: 'A lobby with this name and password already exists.',
            };
        }
        lobbies.push({
            name: body.name,
            password: body.password,
            gameInstance: new Game(),
        });
        return { success: true };
    }
}
