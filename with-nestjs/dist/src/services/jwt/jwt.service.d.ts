import { JwtService as NestJwtService } from '@nestjs/jwt';
export declare class JwtService {
    private readonly jwt;
    constructor(jwt: NestJwtService);
    generateToken(payload: any): Promise<string>;
    verifyToken(token: string): Promise<any>;
}
