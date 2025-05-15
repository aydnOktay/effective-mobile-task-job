import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AdminGuard implements CanActivate {
    private readonly jwtSecret;
    canActivate(context: ExecutionContext): boolean;
}
