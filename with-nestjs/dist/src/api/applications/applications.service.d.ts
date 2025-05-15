import { PrismaService } from '../../../prisma/prisma.service';
import { ApplicationResponseDto, CreateApplicationDto } from './dto';
export declare class ApplicationsService {
    private prisma;
    constructor(prisma: PrismaService);
    createApplication(dto: CreateApplicationDto): Promise<any>;
    getMyApplications(email: string): Promise<ApplicationResponseDto[]>;
}
