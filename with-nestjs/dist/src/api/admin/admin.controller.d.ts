import { AdminService } from './admin.service';
import { ApplicationResponseDto, ByDateApplicationRequestDto, ByDateApplicationResponseDto, CancelApplicationRequestDto, CanceledApplicationResponseDto, CompleteApplicationRequestDto, CompleteApplicationResponseDto, DeleteApplicationResponseDto, LoginRequestDto, ProgressApplicationResponseDto } from './dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    allApplications(): Promise<ApplicationResponseDto[]>;
    deleteApplications(id: string): Promise<DeleteApplicationResponseDto>;
    progressApplications(id: string, req: Request): Promise<ProgressApplicationResponseDto>;
    completeApplications(id: string, req: Request, dto: CompleteApplicationRequestDto): Promise<CompleteApplicationResponseDto>;
    cancelApplications(id: string, dto: CancelApplicationRequestDto, req: Request): Promise<CanceledApplicationResponseDto>;
    cancelAllInProgresApplications(req: Request): Promise<CanceledApplicationResponseDto[]>;
    getApplicationsByDate(dto: ByDateApplicationRequestDto): Promise<ByDateApplicationResponseDto[]>;
    register(dto: LoginRequestDto): Promise<any>;
    login(dto: LoginRequestDto): Promise<any>;
}
