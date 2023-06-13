"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.super_user = exports.premium = exports.user = void 0;
var express_1 = require("express");
//tools
var BlackBox_1 = require("../../controllers/tools/BlackBox");
var Expect_1 = require("../../controllers/tools/Expect");
var FuzzyTrend_1 = require("../../controllers/tools/FuzzyTrend");
var GoldenPattern_1 = require("../../controllers/tools/GoldenPattern");
var Trend_1 = require("../../controllers/tools/Trend");
//middelware
var salesRate_1 = require("../../controllers/tools/salesRate");
var express_validator_1 = require("express-validator");
var authintication_1 = require("../../midellware/authintication");
var authintication_2 = require("../../midellware/authintication");
//roles
exports.user = 'user';
exports.premium = 'premium';
exports.super_user = 'super_user';
var routes = (0, express_1.Router)();
routes.get('/blackbox', authintication_1.verifyUser, (0, authintication_2.verifyRole)(exports.user), BlackBox_1.getBlackBox);
routes.post('/BlackBox', authintication_1.verifyUser, (0, authintication_2.verifyRole)(exports.user), [
    (0, express_validator_1.check)('min_price').escape().notEmpty().isNumeric(),
    (0, express_validator_1.check)('max_price').escape().notEmpty().isNumeric(),
    (0, express_validator_1.check)('review_score').notEmpty().isNumeric(),
    (0, express_validator_1.check)('product_category_name')
        .notEmpty()
        .isString()
        .matches(/^[A-Za-z0-9 ]+$/)
], BlackBox_1.BlackBox);
routes.get('/Expect', authintication_1.verifyUser, (0, authintication_2.verifyRole)(exports.premium), Expect_1.getExpect);
routes.post('/expect', authintication_1.verifyUser, (0, authintication_2.verifyRole)(exports.premium), Expect_1.Expect);
routes.get('/FuzzyTrend', authintication_1.verifyUser, (0, authintication_2.verifyRole)(exports.super_user), FuzzyTrend_1.getFuzzyTrend);
routes.post('/FuzzyTrend1', authintication_1.verifyUser, (0, authintication_2.verifyRole)(exports.super_user), [
    (0, express_validator_1.check)('order_approved_at_start').notEmpty().isDate(),
    (0, express_validator_1.check)('order_approved_at_End').notEmpty().isDate()
], FuzzyTrend_1.FuzzyTrend1);
routes.post('/FuzzyTrend2', authintication_1.verifyUser, (0, authintication_2.verifyRole)(exports.super_user), [
    (0, express_validator_1.check)('order_approved_at_star').notEmpty().isDate(),
    (0, express_validator_1.check)('order_approved_at_End').notEmpty().isDate()
], FuzzyTrend_1.FuzzyTrend2);
routes.post('/FuzzyTrend3', authintication_1.verifyUser, (0, authintication_2.verifyRole)(exports.super_user), [
    (0, express_validator_1.check)('order_approved_at_star').notEmpty().isDate(),
    (0, express_validator_1.check)('order_approved_at_End').notEmpty().isDate(),
    (0, express_validator_1.check)('product_category_name')
        .notEmpty()
        .isString()
        .matches(/^[A-Za-z0-9 ]+$/)
], FuzzyTrend_1.FuzzyTrend3);
routes.post('/GoldenPattern', authintication_1.verifyUser, (0, authintication_2.verifyRole)(exports.super_user), GoldenPattern_1.GoldenPattern);
routes.post('/Trend', authintication_1.verifyUser, (0, authintication_2.verifyRole)(exports.premium), Trend_1.Trend);
routes.get('/salesrate', authintication_1.verifyUser, (0, authintication_2.verifyRole)(exports.premium), salesRate_1.getSalesRate);
routes.post('/salesrate', /*verifyUser, verifyRole(premium),*/ salesRate_1.postSalesRate);
routes.use('/', function (req, res) {
    res.send('<a href="/BlackBox">BlackBox link</a><br><a href="/Expect">expect link</a><br><a href="/FuzzyTrend1">fuzzyTrend1 link</a><br><a href="/FuzzyTrend2">fuzzyTrend2 link</a><br><a href="/FuzzyTrend3">fuzzyTrend3 link</a><br><a href="/GoldenPattern">goldenPattren link</a><br><a href="/Trend">trend link</a>');
});
exports.default = routes;
