import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsArray, IsOptional } from 'class-validator';

export class CreateApplicationDto {
    @ApiProperty({ description: "Email of member", example: 'example@test.com' })
    @IsString()
    email: string;

    @ApiProperty({ description: 'Subject of application', example: 'Test Subject' })
    @IsNotEmpty()
    @IsString()
    subject: string;

    @ApiProperty({ description: 'Content of application', example: 'Test Content' })
    @IsNotEmpty()
    @IsString()
    content: string;

}