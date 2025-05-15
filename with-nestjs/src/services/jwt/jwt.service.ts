import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {


    constructor(private readonly jwt: NestJwtService) { }

    async generateToken(payload: any): Promise<string> {
        return this.jwt.signAsync(payload, { expiresIn: '1h' });
    }

    async verifyToken(token: string): Promise<any> {
        return this.jwt.verifyAsync(token);
    }
}
