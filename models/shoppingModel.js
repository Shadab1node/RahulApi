var mongoose = require("mongoose");
var Schema = mongoose.Schema;

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
            type: [{
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
                    type: Number
                },
                actualPrice: {
                    type: Number
                }
            }],
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
        }
    },
    {
        timestamps: true,
    });

var Shoping = mongoose.model("shoping", shopingSchema);
module.exports = Shoping;
