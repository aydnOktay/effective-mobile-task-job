import { ApplicationsService } from './applications.service';
import { ApplicationResponseDto, CreateApplicationDto } from './dto';
export declare class ApplicationsController {
    private readonly applicationService;
    constructor(applicationService: ApplicationsService);
    createApplication(dto: CreateApplicationDto): Promise<any>;
    getMyApplications(email: string): Promise<ApplicationResponseDto[]>;
}
