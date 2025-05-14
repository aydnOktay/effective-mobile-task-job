import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsArray, IsOptional } from 'class-validator';

export class FeatureScoreDto {
    @ApiProperty({ description: "Özelliğin ID'si", example: 'b563be89-18bf-4f24-a8fa-6b3e239e25fe' })
    @IsString()
    featureId: string;

    @ApiProperty({ description: 'Özelliğin puanı (1-10 arası)', example: 9 })
    @IsNotEmpty()
    score: number;
}