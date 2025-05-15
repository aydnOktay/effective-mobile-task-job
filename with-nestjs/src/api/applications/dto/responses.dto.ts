export class ApplicationResponseDto {
    id: number;
    email: string;
    subject: string;
    content: string;
    status: 'NEW' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    description?: string | null;
    createdAt: Date;
    adminId?: number | null;
}