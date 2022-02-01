const router=require("express").Router()
const Controller=require("../controllers/distributerController")

// ADD DISTRIBUTER

router.route("/adddistributer").post(Controller.adddistributer);
router.route("/getdistributer").get(Controller.getdistributer)
router.route("/updatedistributer/:id").put(Controller.updatedistributer)
router.route("/deletedistributer/:id").delete(Controller.deletedistributer)

module.exports = router;