import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ApiEc, ApiException } from 'src/exceptions';

@Injectable()
export class AdminGuard implements CanActivate {
  private readonly jwtSecret = 'test-oktay-secret-key'; 

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiException(ApiEc.NoTokenProvided);
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      request.user = decoded;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
