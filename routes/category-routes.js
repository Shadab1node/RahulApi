let router = require("express").Router();
var Controller = require("../controllers/categoryController");

// CATEGORY ROUTES

router.route("/addcategory").post(Controller.addcategory);
router.route("/getcategory").get(Controller.getcategory);
router.route("/getcategorybyid/:id").get(Controller.getcategorybyid);
router.route("/updatecategory/:id").put(Controller.updatecategory);
router.route("/deletecategory/:id").delete(Controller.deletecategory);

module.exports = router;
