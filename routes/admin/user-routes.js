let router = require("express").Router();
var Controller = require("../../controllers/admin/userController");
const auth=require("../../midleware/auth")

// ADMIN ROUTES

router.route("/adduser").post(auth.adminloggedIn,Controller.adduser);
router.route("/getuseradmin").get(auth.adminloggedIn,Controller.getuseradmin);
router.route("/updateuseradmin/:id").put(auth.adminloggedIn,Controller.updateuseradmin);
router.route("/deleteadminuser/:id").delete(auth.adminloggedIn,Controller.deleteadminuser);

module.exports = router;
