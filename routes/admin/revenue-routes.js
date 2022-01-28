let router = require("express").Router();
var Controller = require("../../controllers/admin/revenueController");
const auth=require("../../midleware/auth")

// ADMIN ROUTES

router.route("/addrevenue").post(auth.adminloggedIn,Controller.addrevenue);
router.route("/getrevenue").get(auth.adminloggedIn,Controller.getrevenue);
router.route("/updaterevenue/:id").put(auth.adminloggedIn,Controller.updaterevenue);
router.route("/deleterevenue/:id").delete(auth.adminloggedIn,Controller.deleterevenue);


module.exports = router;
