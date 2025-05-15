export declare class ProgressApplicationRequestDto {
    applicationId: number;
    adminId: number;
}
export declare class CompleteApplicationRequestDto {
    description: string;
}
export declare class CancelApplicationRequestDto {
    description: string;
}
export declare class LoginRequestDto {
    username: string;
    password: string;
}
export declare class ByDateApplicationRequestDto {
    startDate?: string;
    endDate?: string;
}
