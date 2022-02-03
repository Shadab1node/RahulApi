require('dotenv').config();
let express = require("express");
require("./config/database")
const cors = require("cors");
const path=require("path")
let app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/upload", express.static(path.join(__dirname, "upload")));

// ALL ROUTES
let adminRoutes=require("./routes/admin/admin-routes")
let customerRoutes=require("./routes/admin/customer-routes")
let venderRoutes=require("./routes/admin/vender-routes")
let revenueRoutes=require("./routes/admin/revenue-routes")
let adminuserRoutes=require("./routes/admin/user-routes")
let wholesalerRoutes=require("./routes/wholeseler/wholeseler-routes")
let custmerRoutes=require("./routes/customer/customer-routes")
let categoryRoutes=require("./routes/category-routes")
let distributerRoutes=require("./routes/distributer-routes")
let itemRoutes=require("./routes/item-routes")
let shopingRoutes=require("./routes/shoping-routes")
let purchaseRoutes=require("./routes/purchase-routes")

var port = process.env.PORT || 2222;
app.use("/api",
adminRoutes,
customerRoutes,
venderRoutes,
revenueRoutes,
adminuserRoutes,
wholesalerRoutes,
custmerRoutes,
categoryRoutes,
distributerRoutes,
itemRoutes,
shopingRoutes,
purchaseRoutes
)

app.listen(port, function () {console.log("Running on port " + port)});
module.exports = app;
