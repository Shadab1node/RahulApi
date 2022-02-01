var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const purchaseSchema= new Schema(
    { 
        shoping:{
            type:Schema.Types.ObjectId,
            ref:"shoping"
        },
        customer:{
            type:Schema.Types.ObjectId,
            ref:"customer"
        },
    },
    {
    timestamps: true,
  });

var Shoping = mongoose.model("purchase",purchaseSchema);
module.exports = Shoping;
