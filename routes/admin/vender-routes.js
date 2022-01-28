let router = require("express").Router();
var Controller = require("../../controllers/admin/venderController");
const auth=require("../../midleware/auth")
const { validateSignupRequest, isRequestValidated } = require('../../validator/vendervelidator');

// ADMIN ROUTES

router.route("/addvender").post(auth.adminloggedIn,validateSignupRequest,isRequestValidated,Controller.addvender);
router.route("/getvender").get(auth.adminloggedIn,Controller.getvender);
router.route("/updatevender/:id").put(auth.adminloggedIn,Controller.updatevender);
router.route("/deletevender/:id").delete(auth.adminloggedIn,Controller.deletevender);

module.exports = router;
