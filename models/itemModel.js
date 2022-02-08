var mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
var Schema = mongoose.Schema;

const itemSchema= new Schema(
    { 
        wholesaler:{
            type:Schema.Types.ObjectId,
            ref:"wholeseler"
          },
        category:{
            type:Schema.Types.ObjectId,
            ref:"category"
        },
        distributer:{
            type:Schema.Types.ObjectId,
            ref:"distibuter"
        },
        photo:{
            type:String,
            required:true
        },
        item:{
            type:String,
            required:true
        },
        brand:{
            type:String,                   
            required:true
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        Qty:{
            type:String,
            required:true
        },
        msrmt:{
            type:String,
            required:true
        },
        active:{
            type:String,
            required:true
        },
        discount:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        }
    },
    {
    timestamps: true,
  });

var Item = mongoose.model("item",itemSchema);
module.exports = Item;
