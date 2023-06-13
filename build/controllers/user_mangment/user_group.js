"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGroup = exports.deleteGroup = exports.create = exports.show = exports.index = void 0;
var user_group_1 = require("../../models/user_mangment/user_group");
var express_validator_1 = require("express-validator");
var info = new user_group_1.USER_groupInfo();
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var groups, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, info.index()];
            case 1:
                groups = _a.sent();
                if (!groups) {
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'not found any groups ,yet,please create users first'
                        })];
                }
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'users show successed',
                        data: { groups: groups }
                    })];
            case 2:
                error_1 = _a.sent();
                res.status(500);
                res.json(error_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.index = index;
//show by id
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, group, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(200).json({ err: 'Invalid Data Passed!', errors: errors })];
                }
                return [4 /*yield*/, info.show(req.body.user_id)];
            case 1:
                group = _a.sent();
                if (!group) {
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'can not find this id'
                        })];
                }
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'group show successed',
                        data: { group: group }
                    })];
            case 2:
                error_2 = _a.sent();
                res.status(500);
                res.json(error_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.show = show;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, newGroup, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(200).json({ err: 'Invalid Data Passed!', errors: errors })];
                }
                return [4 /*yield*/, info.create(req.body.user_id, req.body.group_id)];
            case 1:
                newGroup = _a.sent();
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'group created success',
                        data: __assign({}, newGroup)
                    })];
            case 2:
                error_3 = _a.sent();
                res.status(500);
                res.json(error_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var deleteGroup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, deleted, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(200).json({ err: 'Invalid Data Passed!', errors: errors })];
                }
                return [4 /*yield*/, info.deleteGroup(req.body.user_id)];
            case 1:
                deleted = _a.sent();
                if (!deleted) {
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'can not find this id'
                        })];
                }
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'user delete successed',
                        data: { deleted: deleted }
                    })];
            case 2:
                error_4 = _a.sent();
                //logger.info("Error delete group",error)
                res.status(500);
                res.json(error_4.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteGroup = deleteGroup;
var updateGroup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, updated, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(200).json({ err: 'Invalid Data Passed!', errors: errors })];
                }
                return [4 /*yield*/, info.updateGroup(req.body.id, req.body.group_name)];
            case 1:
                updated = _a.sent();
                if (!updated) {
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'can not find this id'
                        })];
                }
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'user update successed',
                        data: { updated: updated }
                    })];
            case 2:
                error_5 = _a.sent();
                //logger.info("Error delete group",error)
                res.status(500);
                res.json(error_5.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateGroup = updateGroup;
