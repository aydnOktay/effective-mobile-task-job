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
exports.ByDateApplicationRequestDto = exports.LoginRequestDto = exports.CancelApplicationRequestDto = exports.CompleteApplicationRequestDto = exports.ProgressApplicationRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ProgressApplicationRequestDto {
}
exports.ProgressApplicationRequestDto = ProgressApplicationRequestDto;
class CompleteApplicationRequestDto {
}
exports.CompleteApplicationRequestDto = CompleteApplicationRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Please Enter description", example: 'Cong. I accepted your application' }),
    __metadata("design:type", String)
], CompleteApplicationRequestDto.prototype, "description", void 0);
class CancelApplicationRequestDto {
}
exports.CancelApplicationRequestDto = CancelApplicationRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Please Enter description", example: 'Unform. I cancelled your application' }),
    __metadata("design:type", String)
], CancelApplicationRequestDto.prototype, "description", void 0);
class LoginRequestDto {
}
exports.LoginRequestDto = LoginRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Please Enter Your username", example: 'admin' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Please Enter Your username", example: 'admin' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "password", void 0);
class ByDateApplicationRequestDto {
}
exports.ByDateApplicationRequestDto = ByDateApplicationRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Started Date (ISO formatında)', example: '2025-05-01T00:00:00Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ByDateApplicationRequestDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'End Date (ISO formatında)', example: '2025-05-10T23:59:59Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ByDateApplicationRequestDto.prototype, "endDate", void 0);
//# sourceMappingURL=requests.dto.js.map