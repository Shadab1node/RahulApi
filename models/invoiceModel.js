var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const invoiceModel= new Schema(
    { 
        purchase:{
            type:Schema.Types.ObjectId,
            ref:"purchase"
        },
        vender:{
            type:Schema.Types.ObjectId,
            ref:"vender"
        },
        shoping:{
            type:Schema.Types.ObjectId,
            ref:"shoping"
        },
        customer:{
            type:Schema.Types.ObjectId,
            ref:"customer"
        },
        invoice:{
            type:String
        },
        date:{
            type:String
        },
        phone:{
            type:Number
        }
    },
    {
    timestamps: true,
  });

var Invoice= mongoose.model("invoice",invoiceModel);
module.exports = Invoice;
