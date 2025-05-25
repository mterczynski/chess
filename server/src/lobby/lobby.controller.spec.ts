import { Test, TestingModule } from '@nestjs/testing';
import { LobbyController } from './lobby.controller';

describe('LobbyController', () => {
    let controller: LobbyController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LobbyController],
        }).compile();

        controller = module.get<LobbyController>(LobbyController);
    });

    it('should create a lobby and prevent duplicate name+password', () => {
        // Create a new lobby
        const result1 = controller.createLobby({
            name: 'test',
            password: '123',
        });
        expect(result1).toEqual({ success: true });

        // Try to create the same lobby again
        const result2 = controller.createLobby({
            name: 'test',
            password: '123',
        });
        expect(result2).toEqual({
            success: false,
            message: 'A lobby with this name and password already exists.',
        });

        // Different password is allowed
        const result3 = controller.createLobby({
            name: 'test',
            password: '456',
        });
        expect(result3).toEqual({ success: true });

        // Different name is allowed
        const result4 = controller.createLobby({
            name: 'other',
            password: '123',
        });
        expect(result4).toEqual({ success: true });
    });

    it('should reject non-string name or password', () => {
        expect(
            controller.createLobby({ name: 123 as any, password: 'abc' }),
        ).toEqual({
            success: false,
            message: 'Name and password must be strings.',
        });
        expect(
            controller.createLobby({ name: 'abc', password: 123 as any }),
        ).toEqual({
            success: false,
            message: 'Name and password must be strings.',
        });
    });
});
