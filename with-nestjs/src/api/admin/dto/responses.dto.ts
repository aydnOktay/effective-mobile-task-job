import { Status } from '@prisma/client';

export class ApplicationResponseDto {
    id: number;
    email: string;
    subject: string;
    content: string;
    status: Status;
    description?: string;
    createdAt: Date;
    adminId?: number;
}

export class DeleteApplicationResponseDto {
    id: number;
    email: string;
    subject: string;
    content: string;
    status: Status;
    description?: string;
    createdAt: Date;
    adminId?: number;
}

export class ProgressApplicationResponseDto {
  id: number;
  email: string;
  subject: string;
  content: string;
  status: Status;
  description?: string;
  createdAt: Date;
  adminId?: number;
}

export class CompleteApplicationResponseDto {
  id: number;
  email: string;
  subject: string;
  content: string;
  status: Status;
  description?: string;
  createdAt: Date;
  adminId?: number;
}

export class CanceledApplicationResponseDto {
  id: number;
  email: string;
  subject: string;
  content: string;
  status: Status;
  description?: string;
  createdAt: Date;
  adminId?: number;
}

export class ByDateApplicationResponseDto {
  id: number;
  email: string;
  subject: string;
  content: string;
  status: Status;
  description?: string;
  createdAt: Date;
  adminId?: number;
}