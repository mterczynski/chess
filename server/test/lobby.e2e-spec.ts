import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { JwtAuthGuard } from "../src/user/jwt-auth.guard";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../entities";
import { Repository } from "typeorm";

// todo - fix e2e tests, include them in server/package.json:test script
describe("/lobby (e2e)", () => {
    let app: INestApplication;
    let userRepository: Repository<User>;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({
                canActivate: (context) => {
                    const request = context.switchToHttp().getRequest();
                    request.user = { sub: "1" }; // Mock user from JWT
                    return true;
                },
            })
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        // Get user repository and create test user
        userRepository = moduleFixture.get<Repository<User>>(
            getRepositoryToken(User),
        );
        await userRepository.save({
            id: 1,
            username: "test-user",
            passwordHash: "hash",
        });
    });

    afterAll(async () => {
        // Clean up test data
        await userRepository.clear();
        await app.close();
    });

    it("should create a lobby", async () => {
        const res = await request(app.getHttpServer())
            .post("/lobby")
            .send({ password: "123" });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(typeof res.body.id).toBe("number");
    });

    it("should create multiple lobbies", async () => {
        const res1 = await request(app.getHttpServer())
            .post("/lobby")
            .send({ password: "pw" });
        const res2 = await request(app.getHttpServer())
            .post("/lobby")
            .send({ password: "pw" });
        expect(res1.status).toBe(201);
        expect(res2.status).toBe(201);
        expect(res1.body.id).not.toBe(res2.body.id);
    });

    it("should reject non-string password", async () => {
        const res1 = await request(app.getHttpServer())
            .post("/lobby")
            .send({ password: 123 });
        expect(res1.status).toBe(400);
        expect(res1.body.message).toContain("Password must be a string");
    });
});
