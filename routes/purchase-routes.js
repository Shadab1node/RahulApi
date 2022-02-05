let router = require("express").Router();
var Controller = require("../controllers/purchaseController");
const auth=require("../midleware/auth")
// PURCHASE ROUTES

router.route("/addpurchase").post(Controller.addpurchase);
router.route("/getpurchase").get(Controller.getpurchase);
router.route("/purchasebycustomerid/:id").get(Controller.purchasebycustomerid);

module.exports = router;
