import { HttpException } from '@nestjs/common';
import { ApiEc } from './apiec.enum';
export declare class ApiException extends HttpException {
    private readonly errorCode;
    constructor(errorCode: ApiEc, message?: string);
    private static defaultMessageKeyOrErrorCode;
}
