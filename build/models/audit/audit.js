"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Audit = void 0;
var Audit = /** @class */ (function () {
    function Audit(auditAction, data, status, error, auditBy, auditOn) {
        this.auditAction = auditAction;
        this.data = data;
        this.status = status;
        this.error = error;
        this.auditBy = auditBy;
        this.auditOn = auditOn;
    }
    return Audit;
}());
exports.Audit = Audit;
