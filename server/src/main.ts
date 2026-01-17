import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        snapshot: process.env.NODE_ENV !== 'production', // disable in production
    });

    // Configure CORS for production
    const allowedOrigins = process.env.ALLOWED_ORIGINS 
        ? process.env.ALLOWED_ORIGINS.split(',')
        : ["http://localhost:5173", "http://localhost:5174"];
    
    app.enableCors({
        origin: allowedOrigins,
    });

    const port = process.env.PORT ?? 3000;
    await app.listen(port, '0.0.0.0'); // Listen on all interfaces for EB
    console.log(`Application running at ${await app.getUrl()}`);
}
bootstrap();
