import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { AdminGuard } from 'src/guards/admin.guard';

@Module({
  providers: [JwtService],
  exports: [JwtService]
})
export class JwtModule { }
