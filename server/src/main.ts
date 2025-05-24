import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        snapshot: true, // enables debugging https://docs.nestjs.com/devtools/overview
    });
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application running at ${await app.getUrl()}`);
}
bootstrap();
