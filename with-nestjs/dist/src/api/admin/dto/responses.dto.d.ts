import { Status } from '@prisma/client';
export declare class ApplicationResponseDto {
    id: number;
    email: string;
    subject: string;
    content: string;
    status: Status;
    description?: string;
    createdAt: Date;
    adminId?: number;
}
export declare class DeleteApplicationResponseDto {
    id: number;
    email: string;
    subject: string;
    content: string;
    status: Status;
    description?: string;
    createdAt: Date;
    adminId?: number;
}
export declare class ProgressApplicationResponseDto {
    id: number;
    email: string;
    subject: string;
    content: string;
    status: Status;
    description?: string;
    createdAt: Date;
    adminId?: number;
}
export declare class CompleteApplicationResponseDto {
    id: number;
    email: string;
    subject: string;
    content: string;
    status: Status;
    description?: string;
    createdAt: Date;
    adminId?: number;
}
export declare class CanceledApplicationResponseDto {
    id: number;
    email: string;
    subject: string;
    content: string;
    status: Status;
    description?: string;
    createdAt: Date;
    adminId?: number;
}
export declare class ByDateApplicationResponseDto {
    id: number;
    email: string;
    subject: string;
    content: string;
    status: Status;
    description?: string;
    createdAt: Date;
    adminId?: number;
}
