let router = require("express").Router();
var Controller = require("../controllers/categoryController");
var auth=require("../midleware/auth")
// CATEGORY ROUTES

router.route("/addcategory").post(auth.wholesalerloggedIn,Controller.addcategory);
router.route("/getcategory").get(auth.wholesalerloggedIn,Controller.getcategory);
router.route("/getcategorybyid/:id").get(auth.wholesalerloggedIn,Controller.getcategorybyid);
router.route("/updatecategory/:id").put(auth.wholesalerloggedIn,Controller.updatecategory);
router.route("/deletecategory/:id").delete(auth.wholesalerloggedIn,Controller.deletecategory);

module.exports = router;
