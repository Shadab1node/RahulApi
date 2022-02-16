let router = require("express").Router();
var Controller = require("../controllers/shoppingController");
const auth=require("../midleware/auth")

// CATEGORY ROUTES

router.route("/addshoping").post(auth.customerloggedIn,Controller.addshoping);
router.route("/getshoping").get(auth.wholesalerloggedIn, Controller.getshoping);
router.route("/getshopingbyid/:id").get(auth.wholesalerloggedIn, Controller.getshopingbyid);
router.route("/updateshoping").put(auth.wholesalerloggedIn,Controller.updateShopingViaWholesaler);
router.route('/updatedshopingsubmit').put(auth.wholesalerloggedIn, Controller.submitUpdatedShoping);
router.route("/deleteitemfromshoping").delete(auth.wholesalerloggedIn, Controller.deleteItemInShoping);
router.route("/updatedshoping").get(auth.customerloggedIn, Controller.getUpdatedShoping);
router.route("/updatedshoping/:shopingId").get(auth.customerloggedIn, Controller.getUpdatedShopingById);
// router.route("/user/getshoping").get();
router.route("/getitembyvender/:id").get(Controller.itemgetbyvenderid);

module.exports = router;
