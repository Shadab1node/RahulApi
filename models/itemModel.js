var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const itemSchema= new Schema(
    { 
        category:{
            type:Schema.Types.ObjectId,
            ref:"category"
        },
        distributer:{
            type:Schema.Types.ObjectId,
            ref:"distributer"
        },
        photo:{
            type:String
        },
        item:{
            type:String
        },
        brand:{
            type:String
        },
        description:{
            type:String
        },
        itemname:{
            type:String
        },
        price:{
            type:String
        },
        Qty:{
            type:String,
        },
        msrmt:{
            type:String
        },
        active:{
            type:String
        },
        discount:{
            type:String
        },
        date:{
            type:String
        }
    },
    {
    timestamps: true,
  });

var Item = mongoose.model("item",itemSchema);
module.exports = Item;
