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
        }
    }
}
exports.ApiException = ApiException;
//# sourceMappingURL=api.exceptions.js.map