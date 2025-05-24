import { Controller, Post, Body } from '@nestjs/common';
// @ts-ignore
import { Game } from 'game-engine';
// import { Game } from 'game-enginedd';

const lobbies: {
    name: string;
    password: string;
    gameInstance: Game;
}[] = [];

debugger;
// console.log('###### b', b)

var b = Game;
console.log('###### b', b);

var a = new Game();
b;
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
            gameInstance: {} as any,
        });
        return { success: true };
    }
}
