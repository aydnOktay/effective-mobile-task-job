"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiException = void 0;
const common_1 = require("@nestjs/common");
const apiec_enum_1 = require("./apiec.enum");
class ApiException extends common_1.HttpException {
    constructor(errorCode, message) {
        super(message || ApiException.defaultMessageKeyOrErrorCode(errorCode), 400);
        this.errorCode = errorCode;
        console.log(this.message);
    }
    static defaultMessageKeyOrErrorCode(errorCode) {
        switch (errorCode) {
            case apiec_enum_1.ApiEc.InternalServerError:
                return 'API_ERROR_INTERNAL_SERVER_ERROR';
            case apiec_enum_1.ApiEc.ApplicationNotFound:
                return 'API_ERROR_APPLICATION_NOT_FOUND';
            case apiec_enum_1.ApiEc.OnlyNewStatusApplication:
                return 'API_ERROR_ONLY_NEW_STATUS_APPLICATION';
            case apiec_enum_1.ApiEc.OnlyInProgressStatusApplication:
                return 'API_ERROR_ONLY_IN_PROGRESS_STATUS_APPLICATION';
            case apiec_enum_1.ApiEc.UsernameOrPasswordInvalid:
                return 'API_ERROR_USERNAME_OR_PASSWORD_INVALID';
            case apiec_enum_1.ApiEc.NoTokenProvided:
                return 'API_ERROR_NOT_TOKEN_PROVIDER';
            case apiec_enum_1.ApiEc.UsernameAlreadyTaken:
                return 'API_ERROR_USERNAME_ALREADY_TAKEN';
        }
    }
}
exports.ApiException = ApiException;
//# sourceMappingURL=api.exceptions.js.map