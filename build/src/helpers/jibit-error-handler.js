"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JibitErrorHandler = void 0;
class JibitErrorHandler extends Error {
    constructor(error) {
        var _a, _b, _c, _d;
        super(((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code) +
            '(' +
            ((_d = (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) +
            ')' || error.message);
        this.error = error;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, JibitErrorHandler.prototype);
    }
    getErrorDetails() {
        var _a, _b;
        return (((_b = (_a = this.error) === null || _a === void 0 ? void 0 : _a.response) === null || _b === void 0 ? void 0 : _b.data) || {
            code: this.error.code,
            message: this.error.message,
        });
    }
    getRequestURL() {
        return this.error.request.path;
    }
}
exports.JibitErrorHandler = JibitErrorHandler;
//# sourceMappingURL=jibit-error-handler.js.map