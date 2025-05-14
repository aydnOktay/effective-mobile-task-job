import { PrismaService } from '../../../prisma/prisma.service';
export declare class ApplicationsService {
    private prisma;
    constructor(prisma: PrismaService);
    createApplication(dto: any): Promise<any>;
}
