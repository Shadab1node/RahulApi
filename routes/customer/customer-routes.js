let router = require("express").Router();
var Controller = require("../../controllers/Customer/customerController");
const { validateSignupRequest, isRequestValidated,validateSigninRequest } = require('../../validator/customervalidation/customervalidation');

// ADMIN ROUTES

router.route("/customeradd").post(validateSignupRequest,isRequestValidated,Controller.customeradd);
router.route("/customerLogin").post(validateSigninRequest,isRequestValidated,Controller.customerlogin);
router.route("/customermail").post(Controller.customermail);
router.route("/customrforgotpassword").post(Controller.customrforgotpassword);
router.route("/customerforgotusername").post(Controller.customerforgotusername);

module.exports = router;
