import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LobbyController } from "./lobby/lobby.controller";
import { DevtoolsModule } from "@nestjs/devtools-integration";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { LobbyService } from "./lobby/lobby.service";

@Module({
    imports: [
        DevtoolsModule.register({
            // taken from https://docs.nestjs.com/devtools/overview
            http: process.env.NODE_ENV !== "production",
        }),
    ],
    controllers: [AppController, LobbyController, UserController],
    providers: [AppService, UserService, LobbyService],
})
export class AppModule {}
