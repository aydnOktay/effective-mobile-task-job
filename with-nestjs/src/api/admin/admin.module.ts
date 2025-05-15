import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ApplicationsModule } from '../applications/applications.module';
import { ApplicationsService } from '../applications/applications.service';
import { CredsModule } from 'src/services/creds/creds.module';
import { AdminGuard } from 'src/guards/admin.guard';

@Module({
  imports: [ApplicationsModule, CredsModule],
  controllers: [AdminController],
  providers: [AdminService, ApplicationsService]
})
export class AdminModule { }
