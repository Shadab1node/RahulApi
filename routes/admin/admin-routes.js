let router = require("express").Router();
var Controller = require("../../controllers/admin/adminController");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validator/adminvalidator');

// ADMIN ROUTES

router.route("/adminlogin").post(validateSigninRequest, isRequestValidated,Controller.adminlogin);
router.route("/adminmailsend").post(isRequestValidated, validateSigninRequest,Controller.adminmailsend);
router.route("/adminforgotpassword").post(Controller.adminforgotpassword);
router.route("/adminforgotusername").post(Controller.adminforgotusername);


module.exports = router;
