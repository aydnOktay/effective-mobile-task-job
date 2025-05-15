import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AdminModule } from 'src/api/admin/admin.module';
import { ApplicationsModule } from 'src/api/applications/applications.module';
import { CredsModule } from 'src/services/creds/creds.module';



@Module({
  imports: [
    AdminModule,
    CredsModule,
    ApplicationsModule,
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
