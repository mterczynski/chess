import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        snapshot: true, // enables debugging https://docs.nestjs.com/devtools/overview
    });

    app.enableCors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
    });

    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application running at ${await app.getUrl()}`);
}
bootstrap();
