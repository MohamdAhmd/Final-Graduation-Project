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
var controllers = __importStar(require("../../../controllers/user_mangment/userControler"));
var authintication_1 = require("../../../midellware/authintication");
var express_validator_1 = require("express-validator");
var routes = (0, express_1.Router)();
// admin routes
routes.get('/showall', authintication_1.verifyAdmin, controllers.index);
routes.get('/showById', authintication_1.verifyAdmin, controllers.show);
routes.delete('/delete', authintication_1.verifyAdmin, controllers.deleteUser);
//user routes
routes.get('/login', controllers.login);
routes.get('/signup', controllers.signup);
routes.post('/signup', (0, express_validator_1.check)('firstname')
    .not()
    .isEmpty()
    .withMessage('Please Enter First Name')
    .matches(/^[A-Za-z0-9 ]+$/)
    .withMessage('First Name Cannot Contains Special Characters'), (0, express_validator_1.check)('lastname')
    .notEmpty()
    .withMessage('Please Enter Last Name')
    .matches(/^[A-Za-z0-9 ]+$/)
    .withMessage('Last Name Cannot Contains Special Characters'), (0, express_validator_1.check)('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid Format'), (0, express_validator_1.check)('password_digest')
    .not()
    .isEmpty()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'), 
/* .isStrongPassword()
  .withMessage('Enter Strong Password'),*/ controllers.create);
routes.post('/login', (0, express_validator_1.check)('email')
    .not()
    .isEmpty()
    .withMessage('Please Enter Email')
    .isEmail()
    .withMessage('Invalid Format'), (0, express_validator_1.check)('password_digest')
    .not()
    .isEmpty()
    .withMessage('Please Enter Password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'), controllers.cheak);
routes.post('/update', [
    (0, express_validator_1.check)('firstname')
        .escape()
        .notEmpty()
        .matches(/^[A-Za-z0-9 ]+$/),
    (0, express_validator_1.check)('lastname')
        .escape()
        .notEmpty()
        .matches(/^[A-Za-z0-9 ]+$/),
    (0, express_validator_1.check)('email').escape().notEmpty().isEmail(),
    (0, express_validator_1.check)('password_digest').notEmpty().isStrongPassword()
], controllers.updateUser);
routes.all('/logout', controllers.logout);
exports.default = routes;
