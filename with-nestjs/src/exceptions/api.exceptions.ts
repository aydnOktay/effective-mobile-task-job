import { HttpException } from '@nestjs/common';
import { ApiEc } from './apiec.enum';

export class ApiException extends HttpException {
  private readonly errorCode: ApiEc;

  constructor(errorCode: ApiEc, message?: string) {
    super(message || ApiException.defaultMessageKeyOrErrorCode(errorCode), 400);
    this.errorCode = errorCode;
    console.log(this.message);
  }

  private static defaultMessageKeyOrErrorCode(errorCode: ApiEc): string {
    switch (errorCode) {
      case ApiEc.InternalServerError:
        return 'API_ERROR_INTERNAL_SERVER_ERROR';
    }
  }
}
