import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LobbyController } from "./lobby/lobby.controller";
import { DevtoolsModule } from "@nestjs/devtools-integration";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { LobbyService } from "./lobby/lobby.service";
import { User } from "./user/user";

function parsePort(port: string | undefined, fallback: number): number {
    if (!port) return fallback;
    const n = parseInt(port, 10);
    return isNaN(n) ? fallback : n;
}

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.POSTGRES_HOST || "localhost",
            port: parsePort(process.env.POSTGRES_PORT, 5432),
            username: process.env.POSTGRES_USER || "postgres",
            password: process.env.POSTGRES_PASSWORD || "postgres",
            database: process.env.POSTGRES_DB || "chess",
            entities: [User],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || "supersecret",
            signOptions: { expiresIn: "7d" },
        }),
        DevtoolsModule.register({
            http: process.env.NODE_ENV !== "production",
        }),
    ],
    controllers: [AppController, LobbyController, UserController],
    providers: [AppService, UserService, LobbyService],
})
export class AppModule {}
