let router = require("express").Router();
var Controller = require("../controllers/shoppingController");
const auth=require("../midleware/auth")

// CATEGORY ROUTES

router.route("/addshoping").post(auth.customerloggedIn,Controller.addshoping);
router.route("/getshoping").get(Controller.getshoping);
router.route("/getshopingbyid/:id").get(Controller.getshopingbyid);
router.route("/getitembyvender/:id").get(Controller.itemgetbyvenderid)

module.exports = router;
