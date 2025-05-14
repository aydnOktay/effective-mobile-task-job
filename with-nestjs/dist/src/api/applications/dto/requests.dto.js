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
exports.FeatureScoreDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FeatureScoreDto {
}
exports.FeatureScoreDto = FeatureScoreDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Özelliğin ID'si", example: 'b563be89-18bf-4f24-a8fa-6b3e239e25fe' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FeatureScoreDto.prototype, "featureId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Özelliğin puanı (1-10 arası)', example: 9 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FeatureScoreDto.prototype, "score", void 0);
//# sourceMappingURL=requests.dto.js.map