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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cheak = exports.deleteUser = exports.create = exports.show = exports.index = void 0;
var admin_1 = require("../../models/user_mangment/admin");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var role_list_1 = require("../../confg/role_list");
var loger_1 = require("../../servieces/loger");
var logger = new loger_1.LoggerService('Admin.controller');
var info = new admin_1.userInfo();
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, info.index()];
            case 1:
                users = _a.sent();
                if (!users) {
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'not found any users ,yet,please create users first'
                        })];
                }
                logger.info('return Admins List', users);
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'users show successed',
                        data: { users: users }
                    })];
            case 2:
                error_1 = _a.sent();
                logger.info('Error return Admins List', error_1);
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
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, info.show(req.body.id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    logger.error('Error show Admin', "".concat(req.body.id));
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'can not find this id'
                        })];
                }
                logger.info('return Admin by id', user);
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'user show successed',
                        data: { user: user }
                    })];
            case 2:
                error_2 = _a.sent();
                logger.info('Error return Admin by id', error_2);
                res.status(500);
                res.json(error_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.show = show;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, tokenSecret, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password_digest: req.body.password_digest,
                    roles: role_list_1.ROLE.ADMIN
                };
                return [4 /*yield*/, info.create(user)
                    //console.log(newUser);
                ];
            case 1:
                newUser = _a.sent();
                tokenSecret = jsonwebtoken_1.default.sign(newUser, process.env.TOKEN_SECRET_admin);
                logger.info('create Admin', user);
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'Admin created success',
                        data: __assign(__assign({}, newUser), { tokenSecret: tokenSecret })
                    })
                    //res.json(newUser)
                ];
            case 2:
                error_3 = _a.sent();
                logger.info('Error create Admin', error_3);
                res.status(500);
                res.json(error_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, info.deleteUser(req.body.id)];
            case 1:
                deleted = _a.sent();
                if (!deleted) {
                    logger.error('Error delete Admin', "".concat(req.body.id));
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'can not find this id'
                        })];
                }
                logger.info('delete Admin by id', deleted);
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'user delete successed',
                        data: { deleted: deleted }
                    })];
            case 2:
                error_4 = _a.sent();
                logger.info('Error deleted Admin', error_4);
                res.status(500);
                res.json(error_4.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var cheak = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, tokenSecret, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, info.athuntication(req.body.email, req.body.password_digest)
                    // console.log(user);
                ];
            case 1:
                user = _a.sent();
                // console.log(user);
                if (!user) {
                    logger.error('Error SignIN Admin', "".concat(req.body.email, ",").concat(req.body.password_digest));
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'password is unvalid'
                        })];
                }
                tokenSecret = jsonwebtoken_1.default.sign({ user: user }, process.env.TOKEN_SECRET_admin);
                logger.info('signIN Admin by id', user);
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'user authenticated success',
                        data: __assign(__assign({}, user), { tokenSecret: tokenSecret })
                    })];
            case 2:
                error_5 = _a.sent();
                logger.info('signIN deleted Admin', error_5);
                res.status(500);
                res.json(error_5.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.cheak = cheak;
