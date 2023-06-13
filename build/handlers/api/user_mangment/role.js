"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers = __importStar(require("../../../controllers/user_mangment/role"));
var express_validator_1 = require("express-validator");
var routes = (0, express_1.Router)();
// admin routes
routes.get('/showall', controllers.index);
routes.get('/showById', (0, express_validator_1.check)('id').isNumeric(), controllers.show);
routes.delete('/delete', (0, express_validator_1.check)('id').isNumeric(), controllers.deleteRole);
//user routes
routes.post('/create', (0, express_validator_1.check)('role_name')
    .notEmpty()
    .isString()
    .matches(/^[A-Za-z0-9 ]+$/), controllers.create);
routes.post('/updateGroup', [
    (0, express_validator_1.check)('role_name')
        .notEmpty()
        .isString()
        .matches(/^[A-Za-z0-9 ]+$/),
    (0, express_validator_1.check)('id').isNumeric()
], controllers.updateRole);
exports.default = routes;
