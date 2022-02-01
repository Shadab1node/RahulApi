var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const shopingSchema= new Schema(
    { 
        vender:{
            type:Schema.Types.ObjectId,
            ref:"vender"
        },
        item:{
            type:Schema.Types.ObjectId,
            ref:"item"
        },
        select:{
            type:String
        },
        Qut:{
            type:String
        },
        total:{
            type:String
        },
        shipping:{
            type:String
        }
    },
    {
    timestamps: true,
  });

var Shoping = mongoose.model("shoping",shopingSchema);
module.exports = Shoping;
