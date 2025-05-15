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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("./admin.service");
const dto_1 = require("./dto");
const admin_guard_1 = require("../../guards/admin.guard");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async allApplications() {
        return await this.adminService.allApplications();
    }
    async deleteApplications(id) {
        return await this.adminService.deleteApplications(id);
    }
    async progressApplications(id, req) {
        const userId = req.user.sub;
        return await this.adminService.progressApplications(id, userId);
    }
    async completeApplications(id, req, dto) {
        const userId = req.user.sub;
        return await this.adminService.completeApplications(id, userId, dto);
    }
    async cancelApplications(id, dto, req) {
        const userId = req.user.sub;
        return await this.adminService.cancelApplications(id, userId, dto);
    }
    async cancelAllInProgresApplications(req) {
        const userId = req.user.sub;
        return await this.adminService.cancelAllInProgresApplications(userId);
    }
    async getApplicationsByDate(dto) {
        return await this.adminService.getApplicationsByDate(dto);
    }
    async register(dto) {
        return await this.adminService.register(dto);
    }
    async login(dto) {
        return await this.adminService.login(dto);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)("all-application"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "allApplications", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Delete)("delete-application/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteApplications", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Patch)('progress-application/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "progressApplications", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Patch)('completed/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.CompleteApplicationRequestDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "completeApplications", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Patch)('cancel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CancelApplicationRequestDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "cancelApplications", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Patch)('cancel-all-in-progress'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "cancelAllInProgresApplications", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)('applications/by-date'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ByDateApplicationRequestDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getApplicationsByDate", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginRequestDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginRequestDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "login", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map