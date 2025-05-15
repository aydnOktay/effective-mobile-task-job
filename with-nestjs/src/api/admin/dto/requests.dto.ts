import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class ProgressApplicationRequestDto {
    applicationId: number;
    adminId: number;
}

export class CompleteApplicationRequestDto {
    @ApiProperty({ description: "Please Enter description", example: 'Cong. I accepted your application' })
    description: string;

}

export class CancelApplicationRequestDto {
    @ApiProperty({ description: "Please Enter description", example: 'Unform. I cancelled your application' })
    description: string;

}

export class LoginRequestDto {
    @ApiProperty({ description: "Please Enter Your username", example: 'admin' })
    @IsString()
    username: string;

    @ApiProperty({ description: "Please Enter Your username", example: 'admin' })
    @IsString()
    password: string;
}

export class ByDateApplicationRequestDto {
  @ApiPropertyOptional({ description: 'Started Date (ISO formatında)', example: '2025-05-01T00:00:00Z' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'End Date (ISO formatında)', example: '2025-05-10T23:59:59Z' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}