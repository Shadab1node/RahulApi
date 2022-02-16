var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const shopingItemSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'item'
    },
    qty: {
        type: Number,
    },
    newQty: {
        type: Number
    },
    vendorQty: {
        type: Number
    },
    price: {
        type: Number
    },
    vendorPrice: {
        type: Number,
        default: function () {
            return this.qty;
        }
    },
    actualPrice: {
        type: Number
    },
    updatedQty: {
        type: Number
    }    
}, {_id: false});

const shopingSchema = new Schema(
    {
        wholeseler: {
            type: Schema.Types.ObjectId,
            ref: "wholeseler"
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: "customer"
        },
        items: {
            // type: [Schema.Types.ObjectId],
            // ref: "item",
            // default: []
            type: [shopingItemSchema],
            default: []
        },
        select: {
            type: String,
        },
        // finalqty:{
        //     type:String
        // },
        // finalprice:{
        //     type:String
        // },
        pickup: {
            type: String
        },
        shippingCost: {
            type: Number,
            default: 0
        },
        distributor: {
            type: Schema.Types.ObjectId,
            ref: 'distibuter'
        },
        status: {
            type: String,
            enum: ['pending', 'rejected', 'accepted'],
            default: 'pending'
        },
        total: {
            type: Number
        },
        date: {
            type: String
        },
        vendorSubmit: {
            type: Boolean,
            default: false
        },
        credit: {
            type: Number,
            default: 0
        },
        invoiceId: {
            type: string,
        }
    },
    {
        timestamps: true,
    });

var Shoping = mongoose.model("shoping", shopingSchema);
module.exports = Shoping;
