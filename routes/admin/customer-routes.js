let router = require("express").Router();
var Controller = require("../../controllers/admin/customerController");
const auth=require("../../midleware/auth")
const { validateSignupRequest, isRequestValidated } = require('../../validator/customervalidator');

// ADMIN ROUTES

router.route("/addcustomer").post(auth.adminloggedIn,validateSignupRequest,isRequestValidated,Controller.addcustomer);
router.route("/getcustomer").get(auth.adminloggedIn,Controller.getcustomer);
router.route("/updatecustomer/:id").put(auth.adminloggedIn,Controller.updatecustomer);
router.route("/deletecustomer/:id").delete(auth.adminloggedIn,Controller.deletecustomer);


module.exports = router;
