import { Body, Controller, UseGuards, Delete, Get, Param, Request, Post, Query, Put, Patch, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { ApplicationResponseDto, ByDateApplicationRequestDto, ByDateApplicationResponseDto, CancelApplicationRequestDto, CanceledApplicationResponseDto, CompleteApplicationRequestDto, CompleteApplicationResponseDto, DeleteApplicationResponseDto, LoginRequestDto, ProgressApplicationResponseDto } from './dto';
import { AdminGuard } from 'src/guards/admin.guard';


@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) { }

    @UseGuards(AdminGuard)
    @ApiBearerAuth('access-token')
    @Get("all-application")
    async allApplications(): Promise<ApplicationResponseDto[]> {
        return await this.adminService.allApplications()
    }

    @UseGuards(AdminGuard)
    @ApiBearerAuth('access-token')
    @Delete("delete-application/:id")
    async deleteApplications(@Param('id') id: string): Promise<DeleteApplicationResponseDto> {
        return await this.adminService.deleteApplications(id)
    }

    @UseGuards(AdminGuard)
    @ApiBearerAuth('access-token')
    @Patch('progress-application/:id')
    async progressApplications(@Param('id') id: string, @Req() req: Request): Promise<ProgressApplicationResponseDto> {
        const userId = (req as any).user.sub;
        return await this.adminService.progressApplications(id, userId)
    }

    @UseGuards(AdminGuard)
    @ApiBearerAuth('access-token')
    @Patch('completed/:id')
    async completeApplications(@Param('id') id: string, @Req() req: Request, @Body() dto: CompleteApplicationRequestDto): Promise<CompleteApplicationResponseDto> {
        const userId = (req as any).user.sub;
        return await this.adminService.completeApplications(id, userId, dto)
    }

    @UseGuards(AdminGuard)
    @ApiBearerAuth('access-token')
    @Patch('cancel/:id')
    async cancelApplications(@Param('id') id: string, @Body() dto: CancelApplicationRequestDto, @Req() req: Request): Promise<CanceledApplicationResponseDto> {
        const userId = (req as any).user.sub;
        return await this.adminService.cancelApplications(id, userId, dto)
    }

    @UseGuards(AdminGuard)
    @ApiBearerAuth('access-token')
    @Patch('cancel-all-in-progress')
    async cancelAllInProgresApplications(@Req() req: Request): Promise<CanceledApplicationResponseDto[]> {
        const userId = (req as any).user.sub;
        return await this.adminService.cancelAllInProgresApplications(userId)
    }

    @UseGuards(AdminGuard)
    @ApiBearerAuth('access-token')
    @Post('applications/by-date')
    async getApplicationsByDate(@Body() dto: ByDateApplicationRequestDto): Promise<ByDateApplicationResponseDto[]> {
        return await this.adminService.getApplicationsByDate(dto)
    }

    @Post('register')
    async register(@Body() dto: LoginRequestDto): Promise<any> {
        return await this.adminService.register(dto)
    }

    @Post('login')
    async login(@Body() dto: LoginRequestDto): Promise<any> {
        return await this.adminService.login(dto)
    }
}
