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

const isTestRuntime =
    process.env.NODE_ENV === "test" || process.env.JEST_WORKER_ID !== undefined;

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || "supersecret",
            signOptions: { expiresIn: "365d" },
        }),
        ...(!isTestRuntime && process.env.NODE_ENV !== "production"
            ? [DevtoolsModule.register({ http: true })]
            : []),
    ],
    controllers: [AppController, LobbyController, UserController],
    providers: [AppService, UserService, LobbyService],
})
export class AppModule {}

