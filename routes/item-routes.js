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


// ADD DISTRIBUTER

router.route("/additem").post(itemAdd.single("image"),Controller.additem);
router.route("/getitem").get(Controller.getitem)
router.route("/getitembyid/:id").get(Controller.getitembyid)
router.route("/updateitem/:id").put(itemAdd.single("image"),Controller.updateitem)
router.route("/deleteitem/:id").delete(Controller.deleteitem)

module.exports = router;