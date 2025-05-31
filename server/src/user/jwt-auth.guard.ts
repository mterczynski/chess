import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers["authorization"];
        if (!authHeader)
            throw new UnauthorizedException("No authorization header");
        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer" || !token)
            throw new UnauthorizedException("Invalid auth header");
        try {
            const payload = this.jwtService.verify(token);
            // @ts-ignore: Express Request type does not include 'user', but NestJS attaches it
            request.user = payload;
            return true;
        } catch {
            throw new UnauthorizedException("Invalid or expired token");
        }
    }
}
