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
      case ApiEc.ApplicationNotFound:
        return 'API_ERROR_APPLICATION_NOT_FOUND';
      case ApiEc.OnlyNewStatusApplication:
        return 'API_ERROR_ONLY_NEW_STATUS_APPLICATION';
      case ApiEc.OnlyInProgressStatusApplication:
        return 'API_ERROR_ONLY_IN_PROGRESS_STATUS_APPLICATION';
      case ApiEc.UsernameOrPasswordInvalid:
        return 'API_ERROR_USERNAME_OR_PASSWORD_INVALID';
      case ApiEc.NoTokenProvided:
        return 'API_ERROR_NOT_TOKEN_PROVIDER';
      case ApiEc.UsernameAlreadyTaken:
        return 'API_ERROR_USERNAME_ALREADY_TAKEN';
    }
  }
}
