import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ApplicationsService {

    constructor(private prisma: PrismaService) { }

    async createApplication(dto): Promise<any> {

        return this.prisma.application.create({
            data: {
                content: dto.content,
                email: dto.email,
                subject: dto.subject
            }
        })

    }


}
