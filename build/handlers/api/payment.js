"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var payment_1 = require("../../controllers/paypal/payment");
var authintication_1 = require("../../midellware/authintication");
var authintication_2 = require("../../midellware/authintication");
var payment_2 = require("../../controllers/paypal/payment");
var routes = (0, express_1.Router)();
routes.get('/finance', payment_1.getPaymentPage);
routes.get('/buy/premium', authintication_1.totalAmountPremium, payment_1.createPayment);
routes.get('/paymentPremium', function (req, res) {
    res.sendFile('F:/Graduation_project_last_version/paymentPremium.html');
});
routes.get('/buy/super', authintication_2.totalAmountSuper, payment_1.createPayment);
routes.get('/paymentSuper', function (req, res) {
    res.sendFile('F:/Graduation_project_last_version/paymentSuper.html');
});
routes.get('/success', payment_2.UpdateGroupUser, function (req, res) {
    res.sendFile('F:/Graduation_project_last_version/success.html');
});
//routes.get('/success',updateRoleUser)
/*routes.get('/success', UpdateGroupUser, (req: any, res: any) => {
  res.render('success')
})*/
routes.get('/error', function (req, res) {
    res.sendFile('F:/Graduation_project_last_version/error.html');
});
exports.default = routes;
