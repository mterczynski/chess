import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('/lobby (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should create a lobby', async () => {
        const res = await request(app.getHttpServer())
            .post('/lobby')
            .send({ name: 'test', password: '123' });
        expect(res.status).toBe(201); // NestJS default for POST
        expect(res.body).toEqual({ success: true });
    });

    it('should reject duplicate name+password', async () => {
        await request(app.getHttpServer())
            .post('/lobby')
            .send({ name: 'dupe', password: 'pw' });
        const res = await request(app.getHttpServer())
            .post('/lobby')
            .send({ name: 'dupe', password: 'pw' });
        expect(res.body).toEqual({
            success: false,
            message: 'A lobby with this name and password already exists.',
        });
    });

    it('should reject non-string name or password', async () => {
        const res1 = await request(app.getHttpServer())
            .post('/lobby')
            .send({ name: 123, password: 'abc' });
        expect(res1.body).toEqual({
            success: false,
            message: 'Name and password must be strings.',
        });
        const res2 = await request(app.getHttpServer())
            .post('/lobby')
            .send({ name: 'abc', password: 123 });
        expect(res2.body).toEqual({
            success: false,
            message: 'Name and password must be strings.',
        });
    });
});
