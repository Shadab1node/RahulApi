const mongoose=require("mongoose")
const Schema=mongoose.Schema

const revenueSchema=new Schema({
    invoice:{
        type:String
    },
    date:{
        type:String
    },
    customerName:{
        type:String
    },
    VenderName:{
        type:String
    },
    total:{
        type:String
    },
    Revenue:{
        type:String
    },
},
    {
        timestamps: true,
    }
)

const Revenue=mongoose.model("revenue",revenueSchema)
module.exports=Revenue