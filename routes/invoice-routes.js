const router=require("express").Router()
const Controller=require("../controllers/invoiceController")

router.route("/addinvoice").post(Controller.addinvoice)
router.route("/getinvoice").get(Controller.getinvoice)

module.exports=router