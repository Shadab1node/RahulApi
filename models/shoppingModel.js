var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const shopingSchema= new Schema(
    { 
        wholeseler:{
            type:Schema.Types.ObjectId,
            ref:"wholeseler"
        },
        customer:{
            type:Schema.Types.ObjectId,
            ref:"customer"
        },
        items: {  
            type: [Schema.Types.ObjectId],
            ref: "item",
        },
        select:{
            type:String,
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
