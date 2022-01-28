require('dotenv').config();
let express = require("express");
require("./Config/database")
const cors = require("cors");
let app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ALL ROUTES
let adminRoutes=require("./routes/admin/admin-routes")
let customerRoutes=require("./routes/admin/customer-routes")
let venderRoutes=require("./routes/admin/vender-routes")
let revenueRoutes=require("./routes/admin/revenue-routes")
let adminuserRoutes=require("./routes/admin/user-routes")
let wholesalerRoutes=require("./routes/wholeseler/wholeseler-routes")

var port = process.env.PORT || 2222;
app.use("/api",
adminRoutes,
customerRoutes,
venderRoutes,
revenueRoutes,
adminuserRoutes,
wholesalerRoutes
)

app.listen(port, function () {console.log("Running on port " + port)});
module.exports = app;
