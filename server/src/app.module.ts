import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LobbyController } from "./lobby/lobby.controller";
import { DevtoolsModule } from "@nestjs/devtools-integration";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { LobbyService } from "./lobby/lobby.service";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || "supersecret",
            signOptions: { expiresIn: "365d" },
        }),
        DevtoolsModule.register({
            http:
                process.env.NODE_ENV !== "production" &&
                process.env.NODE_ENV !== "test",
        }),
    ],
    controllers: [AppController, LobbyController, UserController],
    providers: [AppService, UserService, LobbyService],
})
export class AppModule {}

