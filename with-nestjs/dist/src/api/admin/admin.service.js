"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const exceptions_1 = require("../../exceptions");
const creds_service_1 = require("../../services/creds/creds.service");
const jwt = require("jsonwebtoken");
let AdminService = class AdminService {
    constructor(prisma, credsService) {
        this.prisma = prisma;
        this.credsService = credsService;
    }
    async allApplications() {
        return await this.prisma.application.findMany();
    }
    async deleteApplications(id) {
        const existing = await this.prisma.application.findUnique({
            where: { id: Number(id) }
        });
        if (!existing) {
            throw new exceptions_1.ApiException(exceptions_1.ApiEc.ApplicationNotFound);
        }
        return await this.prisma.application.delete({
            where: { id: Number(id) },
        });
    }
    async progressApplications(id, userId) {
        const existing = await this.prisma.application.findUnique({
            where: { id: Number(id) }
        });
        if (!existing) {
            throw new exceptions_1.ApiException(exceptions_1.ApiEc.ApplicationNotFound);
        }
        if (existing.status !== 'NEW') {
            throw new exceptions_1.ApiException(exceptions_1.ApiEc.OnlyNewStatusApplication);
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
    async completeApplications(id, userId, dto) {
        const application = await this.prisma.application.findUnique({
            where: { id: Number(id) },
        });
        if (!application) {
            throw new exceptions_1.ApiException(exceptions_1.ApiEc.ApplicationNotFound);
        }
        if (application.status !== 'IN_PROGRESS') {
            throw new exceptions_1.ApiException(exceptions_1.ApiEc.OnlyInProgressStatusApplication);
        }
        const updated = await this.prisma.application.update({
            where: { id: Number(id) },
            data: {
                status: 'COMPLETED',
                description: dto.description,
                adminId: Number(userId),
            },
        });
        return updated;
    }
    async cancelApplications(id, userId, dto) {
        const application = await this.prisma.application.findUnique({
            where: { id: Number(id) },
        });
        if (!application) {
            throw new exceptions_1.ApiException(exceptions_1.ApiEc.ApplicationNotFound);
        }
        if (application.status !== 'IN_PROGRESS') {
            throw new exceptions_1.ApiException(exceptions_1.ApiEc.OnlyInProgressStatusApplication);
        }
        const updated = await this.prisma.application.update({
            where: { id: Number(id) },
            data: {
                status: 'CANCELLED',
                description: dto.description,
                adminId: Number(userId),
            },
        });
        return updated;
    }
    async cancelAllInProgresApplications(userId) {
        const inProgressApps = await this.prisma.application.findMany({
            where: { status: 'IN_PROGRESS' },
        });
        if (inProgressApps.length === 0) {
            return [];
        }
        const updates = await Promise.all(inProgressApps.map((app) => this.prisma.application.update({
            where: { id: app.id },
            data: {
                status: 'CANCELLED',
                description: 'Canceled in bulk operation',
                adminId: Number(userId),
            },
        })));
        return updates;
    }
    async getApplicationsByDate(dto) {
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
    async register(dto) {
        const existingAdmin = await this.prisma.admin.findUnique({
            where: { username: dto.username },
        });
        if (existingAdmin) {
            throw new exceptions_1.ApiException(exceptions_1.ApiEc.UsernameAlreadyTaken);
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
    async login(dto) {
        const admin = await this.prisma.admin.findUnique({
            where: { username: dto.username },
        });
        if (!admin) {
            throw new exceptions_1.ApiException(exceptions_1.ApiEc.UsernameOrPasswordInvalid);
        }
        const isMatch = await this.credsService.passwordMatch(dto.password, admin.password);
        if (!isMatch) {
            throw new exceptions_1.ApiException(exceptions_1.ApiEc.UsernameOrPasswordInvalid);
        }
        const payload = { sub: admin.id, username: admin.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'test-oktay-secret-key', { expiresIn: '1h' });
        return { access_token: token };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, creds_service_1.CredsService])
], AdminService);
//# sourceMappingURL=admin.service.js.map