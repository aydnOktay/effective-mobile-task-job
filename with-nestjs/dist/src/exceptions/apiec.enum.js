"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiEc = void 0;
var ApiEc;
(function (ApiEc) {
    ApiEc[ApiEc["InternalServerError"] = 0] = "InternalServerError";
    ApiEc[ApiEc["ApplicationNotFound"] = 1] = "ApplicationNotFound";
    ApiEc[ApiEc["OnlyNewStatusApplication"] = 2] = "OnlyNewStatusApplication";
    ApiEc[ApiEc["OnlyInProgressStatusApplication"] = 3] = "OnlyInProgressStatusApplication";
    ApiEc[ApiEc["UsernameOrPasswordInvalid"] = 4] = "UsernameOrPasswordInvalid";
    ApiEc[ApiEc["NoTokenProvided"] = 5] = "NoTokenProvided";
    ApiEc[ApiEc["UsernameAlreadyTaken"] = 6] = "UsernameAlreadyTaken";
})(ApiEc || (exports.ApiEc = ApiEc = {}));
//# sourceMappingURL=apiec.enum.js.map