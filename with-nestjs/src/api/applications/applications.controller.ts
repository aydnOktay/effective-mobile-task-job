import { Body, Controller, UseGuards, Delete, Get, Param, Request, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { ApplicationResponseDto, CreateApplicationDto } from './dto';

@Controller('applications')
export class ApplicationsController {

    constructor(private readonly applicationService: ApplicationsService) { }

    @Post()
    async createApplication(@Body() dto: CreateApplicationDto) {
        return await this.applicationService.createApplication(dto)
    }

    @Get("status/:email")
    async getMyApplications(@Query('email') email: string): Promise<ApplicationResponseDto[]> {
        return await this.applicationService.getMyApplications(email)
    }




}
