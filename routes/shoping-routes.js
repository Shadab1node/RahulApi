let router = require("express").Router();
var Controller = require("../controllers/shoppingController");

// CATEGORY ROUTES

router.route("/addshoping").post(Controller.addshoping);
router.route("/getshoping").get(Controller.getshoping);
router.route("/getshopingbyid/:id").get(Controller.getshopingbyid);
router.route("/getitembyvender/:id").get(Controller.itemgetbyvenderid)

module.exports = router;
