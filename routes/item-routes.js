const multer = require("multer");
var path=require("path")
var itemAdd = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/Image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var itemAdd = multer({ storage: itemAdd });

const router=require("express").Router()
const Controller=require("../controllers/itemController")
const auth=require("../midleware/auth")

// ADD DISTRIBUTER

router.route("/additem").post(auth.wholesalerloggedIn,itemAdd.single("image"),Controller.additem);
router.route("/getitem").get(auth.wholesalerloggedIn,Controller.getitem)
router.route("/getallitem").get(Controller.getallitem)
router.route("/getitembyid/:id").get(Controller.getitembyid)
router.route("/updateitem/:id").put(itemAdd.single("image"),Controller.updateitem)
router.route("/deleteitem/:id").delete(Controller.deleteitem)
router.route("/productcategorybyId/:id").get(Controller.productcategorybyId)
router.route("/categorybywholeselerid/:id").get(Controller.categorybywholeselerid)


module.exports = router;