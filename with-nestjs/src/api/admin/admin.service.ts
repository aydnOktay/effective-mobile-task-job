import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ApiEc, ApiException } from 'src/exceptions';
import { ApplicationResponseDto, ByDateApplicationRequestDto, ByDateApplicationResponseDto, CancelApplicationRequestDto, CanceledApplicationResponseDto, CompleteApplicationRequestDto, CompleteApplicationResponseDto, DeleteApplicationResponseDto, LoginRequestDto, ProgressApplicationResponseDto } from './dto';
import { CredsService } from 'src/services/creds/creds.service';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AdminService {

    constructor(private prisma: PrismaService, private readonly credsService: CredsService) { }

    async allApplications(): Promise<ApplicationResponseDto[]> {
        return await this.prisma.application.findMany();
    }

    async deleteApplications(id: string): Promise<DeleteApplicationResponseDto> {

        const existing = await this.prisma.application.findUnique({
            where: { id: Number(id) }
        });

        if (!existing) {
            throw new ApiException(ApiEc.ApplicationNotFound);
        }

        return await this.prisma.application.delete({
            where: { id: Number(id) },
        });
    }

    async progressApplications(id: string, userId: string): Promise<ProgressApplicationResponseDto> {

        const existing = await this.prisma.application.findUnique({
            where: { id: Number(id) }
        });

        if (!existing) {
            throw new ApiException(ApiEc.ApplicationNotFound);
        }

        if (existing.status !== 'NEW') {
            throw new ApiException(ApiEc.OnlyNewStatusApplication);
        }

        const updated = await this.prisma.application.update({
            where: { id: Number(id) },
            data: {
                status: 'IN_PROGRESS',
                adminId: Number(userId),
            },
        });

        return updated;
    }

    async completeApplications(id: string, userId: string, dto: CompleteApplicationRequestDto): Promise<CompleteApplicationResponseDto> {

        const application = await this.prisma.application.findUnique({
            where: { id: Number(id) },
        });

        if (!application) {
            throw new ApiException(ApiEc.ApplicationNotFound);
        }

        if (application.status !== 'IN_PROGRESS') {
            throw new ApiException(ApiEc.OnlyInProgressStatusApplication);
        }

        const updated = await this.prisma.application.update({
            where: { id: Number(id) },
            data: {
                status: 'COMPLETED',
                description: dto.description,
                adminId:  Number(userId),
            },
        });

        return updated;

    }

    async cancelApplications(id: string,userId, dto: CancelApplicationRequestDto): Promise<CanceledApplicationResponseDto> {

        const application = await this.prisma.application.findUnique({
            where: { id: Number(id) },
        });

        if (!application) {
            throw new ApiException(ApiEc.ApplicationNotFound);
        }

        if (application.status !== 'IN_PROGRESS') {
            throw new ApiException(ApiEc.OnlyInProgressStatusApplication);
        }

        const updated = await this.prisma.application.update({
            where: { id: Number(id) },
            data: {
                status: 'CANCELLED',
                description: dto.description,
                adminId:  Number(userId),
            },
        });

        return updated;
    }

    async cancelAllInProgresApplications(userId: string): Promise<CanceledApplicationResponseDto[]> {

        const inProgressApps = await this.prisma.application.findMany({
            where: { status: 'IN_PROGRESS' },
        });

        if (inProgressApps.length === 0) {
            return [];
        }
        const updates = await Promise.all(
            inProgressApps.map((app) =>
                this.prisma.application.update({
                    where: { id: app.id },
                    data: {
                        status: 'CANCELLED',
                        description: 'Canceled in bulk operation',
                        adminId: Number(userId),
                    },
                }),
            ),
        );

        return updates;
    }

    async getApplicationsByDate(dto: ByDateApplicationRequestDto): Promise<ByDateApplicationResponseDto[]> {
        const { startDate, endDate } = dto;

        const start = new Date(startDate);
        const end = endDate
            ? new Date(endDate)
            : new Date(start);

        if (!endDate) {
            end.setHours(23, 59, 59, 999);
        }

        const applications = await this.prisma.application.findMany({
            where: {
                createdAt: {
                    gte: start,
                    lte: end,
                },
            },
        });

        return applications;
    }

    async register(dto: LoginRequestDto): Promise<any> {

        const existingAdmin = await this.prisma.admin.findUnique({
            where: { username: dto.username },
        });

        if (existingAdmin) {
            throw new ApiException(ApiEc.UsernameAlreadyTaken);
        }

        const hashedPassword = await this.credsService.passwordhash(dto.password);

        await this.prisma.admin.create({
            data: {
                username: dto.username,
                password: hashedPassword,
            },
        });
        return { message: 'Admin registered successfully' };
    }

    async login(dto: LoginRequestDto): Promise<any> {
        const admin = await this.prisma.admin.findUnique({
            where: { username: dto.username },
        });

        if (!admin) {
            throw new ApiException(ApiEc.UsernameOrPasswordInvalid);
        }

        const isMatch = await this.credsService.passwordMatch(dto.password, admin.password);
        if (!isMatch) {
            throw new ApiException(ApiEc.UsernameOrPasswordInvalid);
        }

        const payload = { sub: admin.id, username: admin.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'test-oktay-secret-key', { expiresIn: '1h' });

        return { access_token: token };
    }
}



