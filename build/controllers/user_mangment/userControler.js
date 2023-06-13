"use strict";
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
exports.logout = exports.cheak = exports.updateUser = exports.deleteUser = exports.create = exports.signup = exports.login = exports.show = exports.index = exports.tokenSecret = void 0;
var user_1 = require("../../models/user_mangment/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var loger_1 = require("../../servieces/loger");
var loger_2 = require("../../servieces/loger");
var auditService_1 = require("../../audit/auditService");
var auditAction_1 = require("../../audit/auditAction");
var updateDB_1 = require("../../servieces/updateDB");
var express_validator_1 = require("express-validator");
var logger = new loger_2.LoggerService('user.controller');
var info = new user_1.userInfo();
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
                    logger.info('Error return users List', users);
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'not found any users ,yet,please create users first'
                        })];
                }
                logger.info('return users List', users);
                (0, auditService_1.prepareAudit)(auditAction_1.actionList.GET_USER_LIST, users, new Error(), 'postman', (0, loger_1.dateFormat)());
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'users show successed',
                        data: { users: users }
                    })];
            case 2:
                error_1 = _a.sent();
                logger.info('Error return users List', error_1);
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
                    logger.error('Error show user', "".concat(req.body.id));
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'can not find this id'
                        })];
                }
                logger.info('return user by id', user);
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'user show successed',
                        data: { user: user }
                    })];
            case 2:
                error_2 = _a.sent();
                logger.info('Error return user By Id', error_2);
                res.status(500);
                res.json(error_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.show = show;
//----------------------------------------------------------------
var login = function (req, res) {
    res.status(200).render('login', {
        isUser: res.locals.user
    });
};
exports.login = login;
//----------------------------------------------------------------
var signup = function (req, res) {
    res.status(200).render('signup', {
        isUser: res.locals.user
    });
};
exports.signup = signup;
//----------------------------------------------------------------
var maxAge = 1 * 24 * 24 * 60;
var createToken = function (id) {
    // here i create a token which contains paylod, secret, and signture
    return jsonwebtoken_1.default.sign({ id: id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
        // this jwt will expire in one day
    });
};
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, errors, err, newUser, errors_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password_digest: req.body.password_digest,
                    user_type_name: 'User',
                    created_on: new Date(),
                    created_by: 'admin',
                    updated_on: new Date()
                };
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    err = errors;
                    return [2 /*return*/, res.status(200).json({ err: err })];
                }
                return [4 /*yield*/, info.create(user)
                    //tokenSecret = jwt.sign(newUser, process.env.TOKEN_SECRET as Secret)
                    //const token = createToken(newUser.id)
                    // here i send cookie for frontend
                    //res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                    //logger.info("create user ",newUser)
                    //console.log(`newUser.id= ${newUser.id}`)
                ];
            case 1:
                newUser = _a.sent();
                //tokenSecret = jwt.sign(newUser, process.env.TOKEN_SECRET as Secret)
                //const token = createToken(newUser.id)
                // here i send cookie for frontend
                //res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                //logger.info("create user ",newUser)
                //console.log(`newUser.id= ${newUser.id}`)
                (0, updateDB_1.setGroupUser)(newUser.id, 1);
                return [2 /*return*/, res.json({ newUser: newUser.id })];
            case 2:
                errors_1 = _a.sent();
                logger.error('Error create user', errors_1);
                res.status(500);
                res.json({ errors: errors_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, info.deleteUser(req.body.id)];
            case 1:
                deleted = _a.sent();
                if (!deleted) {
                    logger.error('Error delete user ', "".concat(req.body.id));
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'can not find this id'
                        })];
                }
                logger.info('delete user ', deleted);
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'user delete successed',
                        data: { deleted: deleted }
                    })];
            case 2:
                error_3 = _a.sent();
                logger.info('Error delete user', error_3);
                res.status(500);
                res.json(error_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, errors, updated, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password_digest: req.body.password_digest,
                    user_type_name: 'User',
                    created_on: new Date(),
                    created_by: 'admin',
                    updated_on: new Date()
                };
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(200).json({ err: 'Invalid Data Passed!', errors: errors })];
                }
                return [4 /*yield*/, info.updateUser(user)];
            case 1:
                updated = _a.sent();
                if (!updated) {
                    logger.error('Error delete user ', "".concat(req.body.id));
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'can not find this id'
                        })];
                }
                logger.info('delete user ', updated);
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'user update successed',
                        data: { updated: updated }
                    })];
            case 2:
                error_4 = _a.sent();
                logger.info('Error delete user', error_4);
                res.status(500);
                res.json(error_4.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var cheak = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var err, user, token, errors_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                err = (0, express_validator_1.validationResult)(req);
                if (!err.isEmpty()) {
                    return [2 /*return*/, res.status(200).json({ err: err })];
                }
                return [4 /*yield*/, info.athuntication(req.body.email, req.body.password_digest)
                    //console.log(user);
                ];
            case 1:
                user = _a.sent();
                //console.log(user);
                if (!user) {
                    logger.error('Login Error', "".concat(req.body.email, ",").concat(req.body.password_digest));
                    return [2 /*return*/, res.status(404).json({ err: 'Invalid Data Passed!', errors: err })];
                }
                token = createToken(user.id);
                // here i send cookie for frontend
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                //tokenSecret = jwt.sign({ user }, process.env.TOKEN_SECRET as Secret)
                logger.info('signIN user ', user);
                //return res.redirect('/profile')
                return [2 /*return*/, res.json({ user: user })];
            case 2:
                errors_2 = _a.sent();
                logger.error('Error signIN user', errors_2);
                res.status(500);
                res.json({ errors: errors_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.cheak = cheak;
var logout = function (_req, res, _next) {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};
exports.logout = logout;
