let router = require("express").Router();
var Controller = require("../controllers/purchaseController");

// PURCHASE ROUTES

router.route("/addpurchase").post(Controller.addpurchase);
router.route("/getpurchase").get(Controller.getpurchase);


module.exports = router;