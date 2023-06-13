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
exports.checkUser = exports.totalAmountSuper = exports.totalAmountPremium = exports.verifyRole = exports.verifyAdmin = exports.verifyUser = void 0;
var database_1 = __importDefault(require("../database"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/*
export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const headerAuth = req.headers.authorization
    const token = (headerAuth as string).split(' ')[1]
    let payload1: JwtPayload = jwt.verify(token, process.env.TOKEN_SECRET as Secret) as JwtPayload

    req.body.id = payload1.user.id
    req.body.payload1 = payload1.user
    next()
  } catch (error) {
    res.status(401)
    res.json(`Access denied invalid token ${error}`)
    return
  }
}
*/
var verifyUser = function (req, res, next) {
    try {
        var token = req.cookies.jwt;
        // check if json web token exist
        if (token) {
            //if exist so verify token
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, function (err, decodedToken) {
                if (err) {
                    console.log(err.message);
                    res.redirect('/login');
                    //res.send('INVALID_ACCESS_TOKEN FROM MIDDELWARE')
                }
                else {
                    console.log(decodedToken);
                    next();
                }
            });
        }
        else {
            res.redirect('/login');
            //res.send('INVALID_ACCESS_TOKEN FROM MIDDELWARE')
        }
    }
    catch (error) {
        res.status(401);
        res.json("Access denied invalid token ".concat(error));
        return;
    }
};
exports.verifyUser = verifyUser;
var verifyAdmin = function (req, res, next) {
    try {
        var headerAuth = req.headers.authorization;
        var token = headerAuth.split(' ')[1];
        console.log('!!!!!!!!!!!!!!!!!!!' + token);
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET_admin);
        next();
    }
    catch (error) {
        res.status(401);
        res.json("Access denied invalid token ".concat(error));
        return;
    }
};
exports.verifyAdmin = verifyAdmin;
var verifyRole = function (role) {
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, arr, sql, connect, result, group_name, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    id = res.locals.user.id;
                    console.log('id_user===>' + id);
                    res.locals.user.user_type_name = role;
                    arr = ['user', 'premium', 'super_user', 'admin'];
                    sql = "\n      select group_name from app_group\n      WHERE  group_id=(select group_id from user_group\n      WHERE  \"user_id\"=$1);";
                    return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connect = _a.sent();
                    return [4 /*yield*/, connect.query(sql, [id])];
                case 2:
                    result = _a.sent();
                    connect.release();
                    group_name = result.rows[0].group_name;
                    console.log('group_nameOfUser==>' + group_name);
                    console.log(arr.indexOf(group_name));
                    console.log(arr.indexOf(role));
                    if (arr.indexOf(group_name) >= arr.indexOf(role)) {
                        next();
                    }
                    else if (role === 'premium') {
                        res.sendFile('F:/Graduation_project_last_version/paymentPremium.html');
                    }
                    else {
                        res.redirect('http://localhost:3000/api/payment/paymentSuper');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    res.status(401);
                    res.send(error_1);
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
};
exports.verifyRole = verifyRole;
var totalAmountPremium = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        req.body.role = 'premium';
        req.body.price = '19.99';
        next();
        return [2 /*return*/];
    });
}); };
exports.totalAmountPremium = totalAmountPremium;
var totalAmountSuper = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        req.body.price = '39.00';
        req.body.role = 'super_user';
        console.log('from totalAmountSuper=> ' + req.body.price);
        next();
        return [2 /*return*/];
    });
}); };
exports.totalAmountSuper = totalAmountSuper;
var checkUser = function (req, res, next) {
    var token = req.cookies.jwt;
    // check if json web token exist
    if (token) {
        //if exist so verify token
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, function (err, decodedToken) { return __awaiter(void 0, void 0, void 0, function () {
            var sql, connect, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!err) return [3 /*break*/, 1];
                        console.log(err.message);
                        res.locals.user = null;
                        next();
                        return [3 /*break*/, 4];
                    case 1:
                        sql = "\n      select * from users\n      WHERE id = $1;";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        connect = _a.sent();
                        return [4 /*yield*/, connect.query(sql, [decodedToken.id])];
                    case 3:
                        user = _a.sent();
                        connect.release();
                        res.locals.user = user.rows[0];
                        next();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    }
    else {
        res.locals.user = null;
        next();
    }
};
exports.checkUser = checkUser;
