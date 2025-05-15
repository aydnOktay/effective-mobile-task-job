import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApplicationResponseDto, CreateApplicationDto } from './dto';
import { ApiEc, ApiException } from 'src/exceptions';

@Injectable()
export class ApplicationsService {

    constructor(private prisma: PrismaService) { }

    async createApplication(dto: CreateApplicationDto): Promise<any> {

        return this.prisma.application.create({
            data: {
                content: dto.content,
                email: dto.email,
                subject: dto.subject
            }
        })

    }

    async getMyApplications(email: string): Promise<ApplicationResponseDto[]> {
        const exists = await this.prisma.application.findFirst({
            where: { email },
        });

        if (!exists) {
            throw new ApiException(ApiEc.ApplicationNotFound);
        }

        return this.prisma.application.findMany({
            where: { email },
            include: { admin: true },
        });
    }


}
