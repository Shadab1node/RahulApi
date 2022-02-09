var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const shopingSchema= new Schema(
    { 
        wholesaler:{
            type:Schema.Types.ObjectId,
            ref:"wholeseler"
          },
        item:{
            type:Schema.Types.ObjectId,
            ref:"item"
        },
        select:{
            type:String,
            default:"false"
        },
        Qut:{
            type:String
        },
        total:{
            type:String
        },
        finalqty:{
            type:String
        },
        finalprice:{
            type:String
        },
        pickup:{
            type:String
        }
    },
    {
    timestamps: true,
  });

var Shoping = mongoose.model("shoping",shopingSchema);
module.exports = Shoping;
