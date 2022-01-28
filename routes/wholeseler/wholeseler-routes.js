let router = require("express").Router();
var Controller = require("../../controllers/wholeseler/wholeselerController");
const auth=require("../../midleware/auth")
const { validateSignupRequest, isRequestValidated,validateSigninRequest } = require('../../validator/customervalidation/customervalidation');

// ADMIN ROUTES

router.route("/addwholeseler").post(validateSignupRequest,isRequestValidated,Controller.addwholeseler);
router.route("/wholeselerlogin").post(validateSigninRequest,isRequestValidated,Controller.wholeselerlogin);
router.route("/wholeselermail").post(Controller.wholeselermail);
router.route("/wholeselerforgotpassword").post(Controller.wholeselerforgotpassword);
router.route("/wholeselerforgotusername").post(Controller.wholeselerforgotusername);


module.exports = router;
