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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = __importDefault(require("./handlers/api/user_mangment/user"));
var handlers_1 = __importDefault(require("./handlers"));
var tools_1 = __importDefault(require("./handlers/api/tools"));
var payment_1 = __importDefault(require("./handlers/api/payment"));
var authintication_1 = require("./midellware/authintication");
var morgan_1 = __importDefault(require("morgan"));
var dotenv = __importStar(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var connect_flash_1 = __importDefault(require("connect-flash"));
// eslint-disable-next-line no-var, @typescript-eslint/no-var-requires
var contentType = require('content-type');
// eslint-disable-next-line no-var, @typescript-eslint/no-var-requires
var getRawBody = require('raw-body');
function defaultContentTypeMiddleware(req, _res, next) {
    req.headers['content-type'] = req.headers['content-type'] || 'application/json';
    next();
}
//import db from './database'
//import client from './database'
dotenv.config();
//console.log(dotenv.config())
var PORT = process.env.PORT || 3000;
// create an instance server
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, connect_flash_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(defaultContentTypeMiddleware);
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// HTTP request logger middleware
app.use((0, morgan_1.default)('common'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// view engine
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use('*', authintication_1.checkUser);
app.get('/', function (_req, res) {
    res.render('Home', {
        isUser: res.locals.user
    });
});
app.get('/profile', function (_req, res) {
    res.render('profile', {
        user: res.locals.user,
        isUser: res.locals.user
    });
});
app.use('/api', handlers_1.default);
app.use(user_1.default);
app.use(payment_1.default);
app.use(tools_1.default);
// add routing for / path
// limt data to 1mega sent to body
app.use(function (req, res, next) {
    getRawBody(req, {
        length: req.headers['content-length'],
        limit: '1mb',
        encoding: contentType.parse(req).parameters.charset
    }, function (err, string) {
        if (err)
            return next(err);
        req.text = string;
        next();
    });
});
// start express server
app.listen(PORT, function () {
    console.log("Server is starting at prot:".concat(PORT));
});
exports.default = app;
