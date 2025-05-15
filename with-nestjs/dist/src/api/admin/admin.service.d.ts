import { PrismaService } from 'prisma/prisma.service';
import { ApplicationResponseDto, ByDateApplicationRequestDto, ByDateApplicationResponseDto, CancelApplicationRequestDto, CanceledApplicationResponseDto, CompleteApplicationRequestDto, CompleteApplicationResponseDto, DeleteApplicationResponseDto, LoginRequestDto, ProgressApplicationResponseDto } from './dto';
import { CredsService } from 'src/services/creds/creds.service';
export declare class AdminService {
    private prisma;
    private readonly credsService;
    constructor(prisma: PrismaService, credsService: CredsService);
    allApplications(): Promise<ApplicationResponseDto[]>;
    deleteApplications(id: string): Promise<DeleteApplicationResponseDto>;
    progressApplications(id: string, userId: string): Promise<ProgressApplicationResponseDto>;
    completeApplications(id: string, userId: string, dto: CompleteApplicationRequestDto): Promise<CompleteApplicationResponseDto>;
    cancelApplications(id: string, userId: any, dto: CancelApplicationRequestDto): Promise<CanceledApplicationResponseDto>;
    cancelAllInProgresApplications(userId: string): Promise<CanceledApplicationResponseDto[]>;
    getApplicationsByDate(dto: ByDateApplicationRequestDto): Promise<ByDateApplicationResponseDto[]>;
    register(dto: LoginRequestDto): Promise<any>;
    login(dto: LoginRequestDto): Promise<any>;
}
